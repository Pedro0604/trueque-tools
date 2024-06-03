<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\Solicitud;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SolicitudPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Solicitud $solicitud): bool
    {
        // Solo los usuarios involucrados en la solicitud pueden verla
        $solicitudIsFromUser = $user->id === $solicitud->publishedProduct->user->id;
        return $solicitudIsFromUser || $user->id === $solicitud->offeredProduct->user->id;
    }

    /**
     * Determine whether the user can list the model.
     */
    public function list(User $user, Product $product): bool
    {
        $productIsFromUser = $product->user_id === $user->id;
//        $offeredProductIsFromUser = $product->offeredSolicituds->contains('offered_product_id', $product->id);
        $productDoesntHaveATrueque = !$product->hasTrueque;

        return ($productIsFromUser) && $productDoesntHaveATrueque;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Product $product): Response
    {
        $productIsFromUser = $user->id === $product->user_id;
        $productHasTrueque = $product->hasTrueque;

        if($productIsFromUser){
            return Response::deny('Sos el dueño del producto, no podés solicitar un trueque!');
        }
        if($productHasTrueque){
            return Response::deny('El producto ya fue trocado!');
        }
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
//    public function update(User $user, Solicitud $solicitud): bool
//    {
//        //
//    }

    /**
     * Determine whether the user can delete the model.
     */
//    public function delete(User $user, Solicitud $solicitud): bool
//    {
//        //
//    }
}
