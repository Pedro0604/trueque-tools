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
    // Lo van a poder hacer solo los dueños de los productos involucrados
//    public function view(User $user, Solicitud $solicitud): bool
//    {
//        //
//    }

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
