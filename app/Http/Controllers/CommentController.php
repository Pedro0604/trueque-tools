<?php

namespace App\Http\Controllers;

use App\Http\Resources\commentResource;
use App\Http\Resources\ProductResource;
use App\Models\Comment;
use App\Models\Product;
use http\Env\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\ResponseFactory;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        $comments = Comment::all()->sortByDesc('created_at');
        return Inertia::render('Comment/index', [
            'comments' => commentResource::collection($comments),
            'commentCreatedId' => session('comment_created_id'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia('Comment/Create', [
            'products' => ProductResource::collection(Product::all()),      // O aca seria linkear al producto sobre el que quiero commentar?
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment): Response|ResponseFactory
    {
        return inertia('Comment/Show', ['comment' => new commentResource($comment)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comments)
    {
        //
    }
}
