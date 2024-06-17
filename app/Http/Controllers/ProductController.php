<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SolicitudResource;
use App\Http\Resources\SucursalResource;
use App\Http\Resources\TruequeResource;
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
        // Trae los productos que no tienen trueques finalizados exitosamente
        $products = Product::query()
            ->doesntHave('publishedSuccessfulTrueque')
            ->doesntHave('offeredSuccessfulTrueque')
            ->orderByRaw(
                "CASE WHEN promoted_at > datetime('now', '-7 days') THEN 1 ELSE 2 END, created_at DESC"
            );


        if (request('sucursal')) {
            $products->where('sucursal_id', request('sucursal'));
        }
        if (request('category')) {
            $products->where('category', request('category'));
        }

        return Inertia::render('Product/Index', [
            'products' => ProductResource::collection($products->get()),
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

        return redirect($request->redirection_on_success ?? route('product.show', $created_product->id))
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
        $solicituds = $product->user->id === auth()->id() ?
            $product->solicituds()
                ->whereNotIn('state', ['accepted', 'rejected'])
                ->whereDoesntHave('trueque')
                ->orderByDesc('created_at')
                ->get()
            : [];

//        User::find(auth()->id())
//            ->products()
//            ->whereHas('solicituds', function ($query) use ($product) {
//                $query->where('published_product_id', $product->id)
//                    ->whereNotIn('state', ['accepted', 'rejected']);
//            })->orderByDesc('created_at')
//            ->get();

        $trueque = $product->hasTrueque ? new TruequeResource($product->trueque): null;

        return inertia('Product/Show', [
            'product' => new ProductResource($product),
            'comments' => CommentResource::collection($product->comments->sortByDesc('created_at')),
            'solicituds' => SolicitudResource::collection($solicituds),
            'trueque' => $trueque,
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
