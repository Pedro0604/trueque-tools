<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SucursalResource;
use App\Models\Product;
use App\Models\Solicitud;
use App\Http\Requests\StoreSolicitudRequest;
use App\Http\Requests\UpdateSolicitudRequest;
use App\Models\Sucursal;
use App\Models\Trueque;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;
use PhpParser\Builder;

class SolicitudController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Product $product): Response|ResponseFactory|RedirectResponse
    {
        if (auth()->id() == $product->user->id) {
            return back()->with('error', 'Sos el dueño del producto, no podes solicitar un trueque!');
        }

        // TODO - AGREGAR QUE SOLO TRAIGA PRODUCTOS QUE NO ESTÉN TROCADOS
        $available_products = Product::where('user_id', auth()->id())
            ->where('category', $product->category)
            ->get();

        return inertia('Solicitud/Create', [
            'publishedProduct' => new ProductResource($product),
            'availableProducts' => ProductResource::collection($available_products),
            'sucursals' => SucursalResource::collection(Sucursal::all())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSolicitudRequest $request)
    {
        //
    }

    /**
     * Accept a product exchange request.
     */
    public function accept(StoreSolicitudRequest $request)
    {
        //
    }

    /**
     * Reject a product exchange request.
     */
    public function reject(StoreSolicitudRequest $request, Solicitud $solicitud)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solicitud $solicitud)
    {
        //
    }
}
