<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\SolicitudResource;
use App\Http\Resources\SucursalResource;
use App\Http\Resources\TruequeResource;
use App\Models\Comment;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CommentResource;
use App\Models\Solicitud;
use App\Models\Sucursal;
use App\Models\User;
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
        $products = Product::whereDoesntHave('offeredTrueque')
            ->whereDoesntHave('publishedTrueque')
            ->orderBy('created_at', 'desc')
            ->get();

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
        $solicituds = $product->user->id === auth()->id() ?
            $product->solicituds()
                ->where('was_rejected', false)
                ->whereDoesntHave('trueque')
                ->orderByDesc('created_at')
                ->get()
            : [];

//        User::find(auth()->id())
//            ->products()
//            ->whereHas('solicituds', function ($query) use ($product) {
//                $query->where('published_product_id', $product->id)
//                    ->where('was_rejected', false);
//            })->orderByDesc('created_at')
//            ->get();

        $trueque = null;
        if ($product->hasTrueque) {
            if ($product->offeredTrueque()->exists()) {
                $trueque = $product->offeredTrueque;
            } else {
                $trueque = $product->publishedTrueque;
            }
            $trueque = new TruequeResource($trueque);
        }

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
