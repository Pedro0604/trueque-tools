<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SucursalResource;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CommentResource;
use App\Models\Sucursal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        $products = Product::all()->sortByDesc('created_at');
        return Inertia::render('Product/Index', [
            'products' => ProductResource::collection($products),
            'productCreatedId' => session('product_created_id'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia('Product/Create', [
            'sucursals' => SucursalResource::collection(Sucursal::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['promoted_at'] = null;

        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = asset($image->store('project/' . Str::random(), 'public'));
        }

        $product = Product::create($data);

        return to_route('product.index')->with('success', 'Producto creado correctamente')->with('product_created_id', $product->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response|ResponseFactory
    {
        return inertia('Product/Show', [
            'product' => new ProductResource($product),
            'comments' => CommentResource::collection($product->comments),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
