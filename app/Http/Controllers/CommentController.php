<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, Product $product): RedirectResponse
    {
        $response = Gate::inspect('create', [Comment::class, $product]);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['product_id'] = $product->id;

        $created_comment = Comment::create($data);

        return to_route('product.show', $product)
            ->with('success', [
                'message' => 'Comentario creado correctamente',
                'key' => $created_comment->id
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function respond(StoreCommentRequest $request, Comment $comment): RedirectResponse
    {
        $response = Gate::inspect('respond', $comment);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['product_id'] = null;

        $created_comment = Comment::create($data);
        $comment->update(['response_id' => $created_comment->id]);

        return to_route('product.show', $comment->product)
            ->with('success', [
                'message' => 'Respuesta guardada correctamente',
                'key' => $created_comment->id
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        $response = Gate::inspect('update', [Comment::class, $comment]);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        $data = $request->validated();

        $comment->update($data);

        $product = $comment->product ? $comment->product : $comment->originalComment->product;

        return to_route('product.show', $product)
            ->with('success', [
                'message' => 'Comentario creado correctamente',
                'key' => rand()
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $response = Gate::inspect('delete', $comment);

        if ($response->denied()) {
            return back()->with('error', [
                'message' => $response->message(),
                'key' => rand()
            ]);
        }

        // Si es un comentario normal
        if ($comment->product_id !== null) {
            if ($comment->response) {
                $comment->response->delete();
            }
            $product_id = $comment->product_id;
            $comment->delete();
        }
        // Si es una respuesta
        else {
            $originalComment = $comment->originalComment;
            $product_id = $originalComment->product_id;

            $originalComment->update(['response_id' => null]);
            $comment->delete();
        }

        return to_route('product.show', $product_id)
            ->with('success', [
                'message' => 'Comentario eliminado correctamente',
                'key' => rand(),
            ]);
    }
}
