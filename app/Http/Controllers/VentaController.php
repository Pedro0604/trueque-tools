<?php

namespace App\Http\Controllers;

use App\Http\Resources\TruequeResource;
use App\Http\Resources\VentaResource;
use App\Models\Product;
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
    public function index(): Response|ResponseFactory
    {
        $ventas = Venta::orderBy('created_at', 'desc')->get();

        return inertia('Venta/Index', [
            'ventas' => VentaResource::collection($ventas)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Venta $venta): Response|ResponseFactory
    {
        return inertia('Venta/Show', [
            'venta' => new VentaResource($venta)
        ]);
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
        $products = $data['products'];

        DB::transaction(function () use ($data, $trueque, $products) {
            $total = 0;
            foreach ($products as $product) {
                $total += $product['sell_price'];
            }
            $venta = Venta::create([
                'total' => $total,
            ]);
            $trueque->update([
                'venta_id' => $venta->id,
            ]);
            foreach ($products as $product) {
                ProductoVenta::create([
                    'name' => $product['name'],
                    'sell_price' => $product['sell_price'],
                    'venta_id' => $venta->id,
                ]);
            }
        });

        return to_route('venta.show', $trueque->venta_id)
            ->with('success', [
                'message' => 'Venta creada con éxito',
                'key' => rand()
            ]);
    }
}
