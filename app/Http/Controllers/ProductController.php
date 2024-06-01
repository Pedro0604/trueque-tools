<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SolicitudResource;
use App\Http\Resources\SucursalResource;
use App\Models\Comment;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CommentResource;
use App\Models\Solicitud;
use App\Models\Sucursal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
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

        unset($data['image']); // Unset the image value

        $created_product = Product::create($data);

        return redirect($request->redirection_on_success ?? route('product.myProducts'))
            ->with('success', [
                'message' => 'Producto creado correctamente',
                'key' => $created_product->id
            ])->with('product_created_id', $created_product->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response|ResponseFactory
    {
        return inertia('Product/Show', [
            'product' => new ProductResource($product),
            'comments' => CommentResource::collection($product->comments->sortByDesc('created_at')),
            'solicituds' => $product->user->id === auth()->id() ? SolicitudResource::collection($product->solicituds->sortByDesc('created_at')) : [],
            'canCreateComment' => Gate::allows('create', [Comment::class, $product]),
            'canCreateSolicitud' => Gate::allows('create', [Solicitud::class, $product]),
            'canListSolicituds' => Gate::allows('list', [Solicitud::class, $product]),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function myProducts(): Response|ResponseFactory
    {
        $products = Product::all()
            ->sortByDesc('created_at')
            ->where('user_id', auth()->id());
        return inertia('Product/MyProducts', [
            'products' => ProductResource::collection($products),
            'productCreatedId' => session('product_created_id'),
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
