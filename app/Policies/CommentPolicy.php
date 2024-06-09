<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Auth\Authenticatable;

class CommentPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user, Product $product): Response
    {
        if($user->isAdmin()){
            return Response::deny('El administrador no puede realizar comentarios');
        }
        else if($user->isEmpleado()){
            return Response::deny('Un empleado no puede realizar comentarios');
        }

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
    public function respond(Authenticatable $user, Comment $comment): Response
    {
        if($user->isAdmin()){
            return Response::deny('El administrador no puede responder comentarios');
        }
        else if($user->isEmpleado()){
            return Response::deny('Un empleado no puede responder comentarios');
        }

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
//    public function update(Authenticatable $user, Comment $comment): bool
//    {
//        //
//    }

    /**
     * Determine whether the user can delete the model.
     */
//    public function delete(Authenticatable $user, Comment $comment): bool
//    {
//        //
//    }
}
