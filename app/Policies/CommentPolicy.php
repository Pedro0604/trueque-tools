<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Product $product): Response
    {
        $productIsFromUser = $product->user_id === $user->id;
        $productHasATrueque = $product->hasTrueque;

        if($productIsFromUser){
            return Response::deny('No podés comentar en tu propio producto');
        }

        if($productHasATrueque){
            return Response::deny('No podés comentar en un producto con un trueque pactado');
        }
        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     */
    public function respond(User $user, Comment $comment): Response
    {
        $commentHasAnAnswer = $comment->response_id !== null;
        $commentIsAnAnswer = $comment->product_id === null;
        $commentIsFromUser = $comment->user_id === $user->id;
        $productIsNotFromUser = $comment->product && $comment->product->user_id !== $user->id;
        $productHasATrueque = $comment->product && $comment->product->hasTrueque;

        if($commentHasAnAnswer){
            return Response::deny('Este comentario ya tiene una respuesta');
        }
        if($commentIsAnAnswer){
            return Response::deny('No podés responder una respuesta');
        }
        if($commentIsFromUser){
            return Response::deny('No podés responder tu propio comentario');
        }
        if($productIsNotFromUser){
            return Response::deny('Solo podés responder a comentarios en tus productos');
        }
        if($productHasATrueque){
            return Response::deny('No podés responder comentarios en un producto con un trueque pactado');
        }
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
//    public function update(User $user, Comment $comment): bool
//    {
//        //
//    }

    /**
     * Determine whether the user can delete the model.
     */
//    public function delete(User $user, Comment $comment): bool
//    {
//        //
//    }
}
