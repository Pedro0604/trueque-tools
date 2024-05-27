<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\StoreResponseRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['product_id'] = $product->id;

        Comment::create($data);

        return to_route('product.show', $product)->with('success', 'Comentario creado correctamente');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function respond(StoreCommentRequest $request, Comment $comment): RedirectResponse
    {
        if($comment->response_id !== null) {
            return back()->with('error', 'Este comentario ya tiene una respuesta');
        }
        if($comment->product_id === null) {
            return back()->with('error', 'No se puede responder una respuesta');
        }
        if($comment->user_id === auth()->id()) {
            return back()->with('error', 'No podés responder tu propio comentario');
        }
        if($comment->product->user->id !== auth()->id()) {
            return back()->with('error', 'Solo podés responder a comentarios en tus productos');
        }

        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['product_id'] = null;

        $created_comment = Comment::create($data);
        $comment->update(['response_id' => $created_comment->id]);

        return to_route('product.show', $comment->product)->with('success', 'Respuesta guardada correctamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comments)
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
