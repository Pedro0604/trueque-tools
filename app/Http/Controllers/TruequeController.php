<?php

namespace App\Http\Controllers;

use App\Http\Requests\FailTruequeRequest;
use App\Http\Resources\TruequeErrorResource;
use App\Http\Resources\TruequeResource;
use App\Models\Solicitud;
use App\Models\Trueque;
use App\Http\Requests\StoreTruequeRequest;
use App\Http\Requests\UpdateTruequeRequest;
use App\Models\TruequeError;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;
use Inertia\ResponseFactory;

class TruequeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Trueque::class);

        $trueques = Trueque::orderBy('created_at', 'desc')->get();

        return inertia('Trueque/Index', [
            'trueques' => TruequeResource::collection($trueques),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTruequeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Trueque $trueque): Response|ResponseFactory
    {
        Gate::authorize('view', $trueque);

        return inertia('Trueque/Show', [
            'trueque' => new TruequeResource($trueque),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trueque $trueque)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTruequeRequest $request, Trueque $trueque)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trueque $trueque)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function myTrueques(): Response|ResponseFactory
    {
        $trueques = Trueque::whereHas('solicitud.publishedProduct', function ($query) {
            $query->where('user_id', auth()->id());
        })
            ->orWhereHas('solicitud.offeredProduct', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Trueque/MyTrueques', [
            'trueques' => TruequeResource::collection($trueques),
        ]);
    }

    /**
     * Register the trueque cancelation by an owner
     */
    public function cancel(Trueque $trueque): RedirectResponse
    {
        Gate::authorize('cancel', $trueque);
        $user = auth()->user();

        DB::transaction(function () use ($trueque, $user) {
            $user->update(['reputation' => ($user->reputation - 1)]);

            $published_product = $trueque->solicitud->publishedProduct;
            $offered_product = $trueque->solicitud->offeredProduct;

            // Pausa todas las solicitudes hacia el producto publicado
            $published_product->solicituds()->where('state', 'paused')->update(['state' => 'normal']);

            // Pausa todas las solicitudes donde se ofreció el producto publicado
            $published_product->offeredSolicituds()->where('state', 'paused')->update(['state' => 'normal']);

            // Pausa todas las solicitudes hacia el producto ofrecido
            $offered_product->solicituds()->where('state', 'paused')->update(['state' => 'normal']);

            // Pausa todas las solicitudes donde se ofreció el producto ofrecido
            $offered_product->offeredSolicituds()->where('state', 'paused')->update(['state' => 'normal']);

            $userIsPublishedProductOwner = $published_product->user_id === $user->id;

            $trueque->update([
                'is_failed' => true,
                'ended_at' => now()
            ]);

            if ($userIsPublishedProductOwner) {
                $trueque->update(['published_error_id' => 1]);
            } else {
                $trueque->update(['offered_error_id' => 1]);
            }
        });

        return to_route('trueque.show', $trueque->id)
            ->with('success', [
                'message' => 'Trueque cancelado correctamente',
                'key' => rand()
            ]);
    }

    /**
     * Register the trueque finalization by an admin/employee
     */
    public function end(Trueque $trueque): RedirectResponse
    {
        Gate::authorize('end', $trueque);

        DB::transaction(function () use ($trueque) {
            $user1 = $trueque->solicitud->publishedProduct->user;
            $user2 = $trueque->solicitud->offeredProduct->user;

            $user1->update(['reputation' => ($user1->reputation + 1)]);
            $user2->update(['reputation' => ($user2->reputation + 1)]);

            $product1 = $trueque->solicitud->publishedProduct;
            $product2 = $trueque->solicitud->offeredProduct;

            // Pausa todas las solicitudes hacia el producto publicado
            $product1->solicituds()->where('state', 'paused')->update(['state' => 'rejected']);

            // Pausa todas las solicitudes donde se ofreció el producto publicado
            $product1->offeredSolicituds()->where('state', 'paused')->update(['state' => 'rejected']);

            // Pausa todas las solicitudes hacia el producto ofrecido
            $product2->solicituds()->where('state', 'paused')->update(['state' => 'rejected']);

            // Pausa todas las solicitudes donde se ofreció el producto ofrecido
            $product2->offeredSolicituds()->where('state', 'paused')->update(['state' => 'rejected']);

            $trueque->update(['ended_at' => now()]);
        });

        return to_route('venta.create', $trueque->id)
            ->with('success', [
                'message' => 'Trueque finalizado correctamente',
                'key' => rand()
            ]);
    }

    /**
     * Register the trueque finalization by an admin/employee
     */
    public function failForm(Trueque $trueque): Response|ResponseFactory
    {
        Gate::authorize('fail', $trueque);

        $trueque_errors = TruequeError::where('id', '<>', '1')->get();
        return inertia('Trueque/Fail', [
            'trueque' => new TruequeResource($trueque),
            'truequeErrors' => TruequeErrorResource::collection($trueque_errors),
        ]);
    }

    /**
     * Register the trueque finalization by an admin/employee
     */
    public function fail(FailTruequeRequest $request, Trueque $trueque): RedirectResponse
    {
        Gate::authorize('fail', $trueque);
        $request->validated();

        DB::transaction(function () use ($trueque, $request) {
            $published_product = $trueque->solicitud->publishedProduct;
            $offered_product = $trueque->solicitud->offeredProduct;

            $published_user = $published_product->user;
            $offered_user = $offered_product->user;

            if ($request->published_error_id != 0) {
                $trueque->update(['published_error_id' => $request->published_error_id]);
                $published_user->update(['reputation' => ($published_user->reputation - 1)]);
            }
            if ($request->offered_error_id != 0) {
                $trueque->update(['offered_error_id' => $request->offered_error_id]);
                $offered_user->update(['reputation' => ($offered_user->reputation - 1)]);
            }

            // Pausa todas las solicitudes hacia el producto publicado
            $published_product->solicituds()->where('state', 'paused')->update(['state' => 'normal']);

            // Pausa todas las solicitudes donde se ofreció el producto publicado
            $published_product->offeredSolicituds()->where('state', 'paused')->update(['state' => 'normal']);

            // Pausa todas las solicitudes hacia el producto ofrecido
            $offered_product->solicituds()->where('state', 'paused')->update(['state' => 'normal']);

            // Pausa todas las solicitudes donde se ofreció el producto ofrecido
            $offered_product->offeredSolicituds()->where('state', 'paused')->update(['state' => 'normal']);

            $trueque->update([
                'is_failed' => true,
                'ended_at' => now()
            ]);
        });

        return to_route('trueque.show', $trueque->id)
            ->with('success', [
                'message' => 'Fallo en trueque informado correctamente.',
                'key' => rand()
            ]);
    }
}
