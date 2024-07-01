<?php

namespace App\Http\Controllers;
use App\Http\Resources\SucursalResource;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Sucursal;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Http\Requests\StoreSucursalRequest;
use App\Http\Requests\UpdateSucursalRequest;
use Inertia\Response;
use Inertia\ResponseFactory;


class SucursalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todas las sucursales
        $sucursals = Sucursal::all();

        return Inertia::render('Sucursal/Index', [
            'sucursals' => SucursalResource::collection($sucursals)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return Inertia::render('Sucursal/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSucursalRequest $request)
    {
        $data = $request->validated();
        Sucursal::create($data);
        return redirect(route('sucursal.index'))->with('success', [
        'message' => 'Sucursal creada correctamente',
        'key' => rand()
    ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sucursal $sucursal)
    {
        //
    }

    /**
     * Index the form for editing the specified resource.
     */
    public function edit(Sucursal $sucursal): Response|ResponseFactory
    {
        return inertia('Sucursal/Edit', [
            'sucursal' => new SucursalResource($sucursal),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSucursalRequest $request, Sucursal $sucursal): RedirectResponse
    {
        $data = $request->validated();

        $sucursal->update($data);

        return to_route('sucursal.index')
            ->with('success', [
                'message' => 'Sucursal modificada correctamente',
                'key' => rand()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sucursal $sucursal, Sucursal $transferSucursal): RedirectResponse
    {
        $response = Gate::inspect('delete', $sucursal);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        DB::transaction(
            function () use ($sucursal, $transferSucursal) {
                //Transfiere clientes a 'sucursal de traspaso'
                $clientes = User::all()
                    ->where('sucursal_id', '$sucursal->id');

                foreach ($clientes as $cliente) {
                    $cliente->update(['sucursal_id', '$transferSucursal->id']);
                }

                //Transfiere productos de clientes a 'sucursal de traspaso'
                $products = Product::all()
                    ->where('sucursal_id', '$sucursal->id');

                foreach ($products as $product) {
                    $product->update(['sucursal_id', '$transferSucursal->id']);
                }

                //Elimina sucursal
                $sucursal->delete();
            }
        );

        return to_route('sucursal.index')
            ->with('success', [
                'message' => 'Sucursal eliminada correctamente',
                'key' => rand(),
            ]);
    }
}
