<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmpleadoResource;
use App\Http\Resources\SucursalResource;
use App\Models\Empleado;
use App\Http\Requests\StoreEmpleadoRequest;
use App\Http\Requests\UpdateEmpleadoRequest;
use App\Models\Product;
use App\Models\Sucursal;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        $empleados = Empleado::all();

        return inertia('Empleado/Index', [
            'empleados' => EmpleadoResource::collection($empleados),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        $sucursals = Sucursal::all();
        return inertia('Empleado/Create', [
            'sucursals' => SucursalResource::collection($sucursals),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmpleadoRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['dni']);

        $empleado_created = Empleado::create($data);

        return redirect(route('admin.empleado.index'))
            ->with('success', [
                'message' => 'Producto creado correctamente',
                'key' => $empleado_created->id
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Empleado $empleado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Empleado $empleado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmpleadoRequest $request, Empleado $empleado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empleado $empleado)
    {
        //
    }
}
