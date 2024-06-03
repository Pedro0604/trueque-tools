<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTruequeRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SucursalResource;
use App\Models\Product;
use App\Models\Solicitud;
use App\Http\Requests\StoreSolicitudRequest;
use App\Models\Sucursal;
use App\Models\Trueque;
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
            ->doesntHave('offeredTrueque')
            ->doesntHave('publishedTrueque')
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
        $data['was_rejected'] = false;

        $created_solicitud = Solicitud::create($data);

        // TODO - DESPUÉS REDIRIGIR A MIS SOLICITUDES (?
        return to_route('product.show', $product->id)
            ->with('success', [
                'message' => 'Solicitud creada correctamente',
                'key' => $created_solicitud->id
            ]);
    }

    /**
     * Accept a product exchange request.
     */
    public function accept(StoreTruequeRequest $request, Product $product, Solicitud $solicitud)
    {
        $data = $request->validated();
        $data['ended_at'] = null;
        $data['is_failed'] = false;

        DB::transaction(function () use ($product, $data, $solicitud) {
            $created_trueque = Trueque::create($data);

            // Rechaza todas las solicitudes hacia el producto publicado
            $product->solicituds()->update(['was_rejected' => true]);

            // Rechaza todas las solicitudes donde se ofreció el producto publicado
            $product->offeredSolicituds()->update(['was_rejected' => true]);

            // Rechaza todas las solicitudes hacia el producto ofrecido
            $solicitud->offeredProduct->solicituds()->update(['was_rejected' => true]);

            // Rechaza todas las solicitudes donde se ofreció el producto ofrecido
            $solicitud->offeredProduct->offeredSolicituds()->update(['was_rejected' => true]);

            $solicitud->update(['was_rejected' => false]);

            return to_route('product.show', $product->id)
                ->with('success', [
                    'message' => 'Trueque pactado exitosamente',
                    'key' => $created_trueque->id
                ]);
        });

        return to_route('product.show', $product->id)
            ->with('error', [
                'message' => 'Fallo al pactar el trueque',
                'key' =>  rand()
            ]);
    }

    /**
     * Reject a product exchange request.
     */
    public function reject(Product $product)
    {
        dd("chau");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solicitud $solicitud)
    {
        //
    }
}
