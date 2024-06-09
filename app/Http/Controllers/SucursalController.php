<?php

namespace App\Http\Controllers;
use App\Http\Resources\SucursalResource;
use App\Models\Sucursal;
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
    public function edit(Sucursal $sucursal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSucursalRequest $request, Sucursal $sucursal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sucursal $sucursal)
    {
        //
    }
}
