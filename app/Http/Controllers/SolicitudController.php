<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTruequeRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SolicitudResource;
use App\Http\Resources\SucursalResource;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Solicitud;
use App\Http\Requests\StoreSolicitudRequest;
use App\Models\Sucursal;
use App\Models\Trueque;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;
use Inertia\ResponseFactory;

class SolicitudController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Product $product): Response|ResponseFactory|RedirectResponse
    {
        Gate::authorize('create', [Solicitud::class, $product]);

        $available_products = Product::where('user_id', auth()->id())
            ->where('category', $product->category)
            ->doesntHave('publishedSuccessfulTrueque')
            ->doesntHave('offeredSuccessfulTrueque')
            ->doesntHave('publishedPendingTrueque')
            ->doesntHave('offeredPendingTrueque')
            ->whereDoesntHave('offeredSolicituds', function (Builder $query) use ($product) {
                $query->where('published_product_id', $product->id);
            })
            ->get();

        return inertia('Solicitud/Create', [
            'publishedProduct' => new ProductResource($product),
            'availableProducts' => ProductResource::collection($available_products),
            'sucursals' => SucursalResource::collection(Sucursal::all()),
            'productCreated' => session('product_created_id') ? new ProductResource(Product::find(session('product_created_id'))) : null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSolicitudRequest $request, Product $product): RedirectResponse
    {
        Gate::authorize('create', [Solicitud::class, $product]);

        $data = $request->validated();
        $data['state'] = 'normal';

        $created_solicitud = Solicitud::create($data);

        return to_route('solicitud.mySolicitudsSent')
            ->with('success', [
                'message' => 'Solicitud creada correctamente',
                'key' => $created_solicitud->id
            ]);
    }

    /**
     * Accept a product exchange request.
     */
    public function accept(StoreTruequeRequest $request, Product $product, Solicitud $solicitud): RedirectResponse
    {
        $response = Gate::inspect('accept', [$solicitud, $product]);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        function generateRandomString($length = 10)
        {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        $data = $request->validated();
        $data['ended_at'] = null;
        $data['is_failed'] = false;

        $code = generateRandomString();
        $intentos = 100;
        while (Trueque::where('code', $code)->exists() && $intentos > 0) {
            $code = generateRandomString();
            $intentos--;
        }
        if ($intentos == 0) {
            return to_route('product.show', $product->id)
                ->with('error', [
                    'message' => 'Fallo al pactar el trueque. Por favor intente nuevamente',
                    'key' => rand()
                ]);
        }
        $data['code'] = $code;

        $created_trueque = null;
        DB::transaction(function () use ($product, $data, $solicitud, &$created_trueque) {
            // Pausa todas las solicitudes hacia el producto publicado
            $product->solicituds()->where('state', 'normal')->update(['state' => 'paused']);

            // Pausa todas las solicitudes donde se ofreció el producto publicado
            $product->offeredSolicituds()->where('state', 'normal')->update(['state' => 'paused']);

            // Pausa todas las solicitudes hacia el producto ofrecido
            $solicitud->offeredProduct->solicituds()->where('state', 'normal')->update(['state' => 'paused']);

            // Pausa todas las solicitudes donde se ofreció el producto ofrecido
            $solicitud->offeredProduct->offeredSolicituds()->where('state', 'normal')->update(['state' => 'paused']);

            $solicitud->update(['state' => 'accepted']);

            $created_trueque = Trueque::create($data);
        });

        if ($created_trueque) {
            return to_route('trueque.show', $created_trueque->id)
                ->with('success', [
                    'message' => 'Trueque pactado exitosamente',
                    'key' => $created_trueque->id
                ]);
        }

        return to_route('product.show', $product->id)
            ->with('error', [
                'message' => 'Fallo al pactar el trueque. Por favor intente nuevamente',
                'key' => rand()
            ]);
    }

    /**
     * Reject a product exchange request.
     */
    public function reject(Request $request, Product $product, Solicitud $solicitud): RedirectResponse
    {
        $response = Gate::inspect('reject', [$solicitud, $product]);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        $solicitud->update(['state' => 'rejected']);

        return redirect($request->redirectOnReject ?? route('product.show', $product->id))
            ->with('success', [
                'message' => 'Solcitud de trueque rechazada correctamente',
                'key' => rand()
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solicitud $solicitud)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function mySolicitudsReceived(): Response|ResponseFactory
    {
        $solicituds = Solicitud::whereHas('publishedProduct', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Solicitud/MySolicituds', [
            'solicituds' => SolicitudResource::collection($solicituds),
            'isPublishedProductOwner' => true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function mySolicitudsSent(): Response|ResponseFactory
    {
        $solicituds = Solicitud::whereHas('offeredProduct', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Solicitud/MySolicituds', [
            'solicituds' => SolicitudResource::collection($solicituds),
            'isPublishedProductOwner' => false,
        ]);
    }
}
