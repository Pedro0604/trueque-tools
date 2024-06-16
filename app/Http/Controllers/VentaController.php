<?php

namespace App\Http\Controllers;

use App\Http\Resources\TruequeResource;
use App\Models\ProductoVenta;
use App\Models\Trueque;
use App\Models\Venta;
use App\Http\Requests\StoreVentaRequest;
use App\Http\Requests\UpdateVentaRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;
use Inertia\ResponseFactory;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Trueque $trueque): Response|ResponseFactory
    {
        Gate::authorize('create', [Venta::class, $trueque]);

        return inertia('Venta/Create', [
            'trueque' => new TruequeResource($trueque)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVentaRequest $request, Trueque $trueque): RedirectResponse
    {
        Gate::authorize('create', [Venta::class, $trueque]);
        $data = $request->validated();

        DB::transaction(function () use ($data, $trueque) {
            if (count($data['publishedUserProducts'])) {
                $total = 0;
                foreach ($data['publishedUserProducts'] as $product) {
                    $total += $product['sell_price'];
                }
                $publishedVenta = Venta::create([
                    'total' => $total,
                    'trueque_id' => $trueque->id,
                    'user_id' => $trueque->solicitud->publishedProduct->user_id,
                ]);
                foreach ($data['publishedUserProducts'] as $product) {
                    ProductoVenta::create([
                        'bar_code' => $product['bar_code'],
                        'sell_price' => $product['sell_price'],
                        'venta_id' => $publishedVenta->id,
                    ]);
                }
            }

            if (count($data['offeredUserProducts'])) {
                $total = 0;
                foreach ($data['offeredUserProducts'] as $product) {
                    $total += $product['sell_price'];
                }
                $offeredVenta = Venta::create([
                    'total' => $total,
                    'trueque_id' => $trueque->id,
                    'user_id' => $trueque->solicitud->offeredProduct->user_id,
                ]);
                foreach ($data['offeredUserProducts'] as $product) {
                    ProductoVenta::create([
                        'bar_code' => $product['bar_code'],
                        'sell_price' => $product['sell_price'],
                        'venta_id' => $offeredVenta->id,
                    ]);
                }
            }
        });

        $message = count($data['publishedUserProducts']) && count($data['offeredUserProducts']) ? 'Ventas creadas con éxito' : 'Venta creada con éxito';

        return to_route('venta.index')
            ->with('success', [
                'message' => $message,
                'key' => rand()
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Venta $venta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Venta $venta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVentaRequest $request, Venta $venta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Venta $venta)
    {
        //
    }
}
