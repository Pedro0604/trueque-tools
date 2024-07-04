<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\Solicitud;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Auth\Authenticatable;

class SolicitudPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user, Solicitud $solicitud): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            return true;
        }

        // Solo los usuarios involucrados en la solicitud pueden verla
        $solicitudIsFromUser = $user->id === $solicitud->publishedProduct->user->id;
        return $solicitudIsFromUser || $user->id === $solicitud->offeredProduct->user->id;
    }

    /**
     * Determine whether the user can list the model.
     */
    public function list(Authenticatable $user, Product $product): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            return true;
        }
        if($product->trashed()){
            return false;
        }

        $productIsFromUser = $product->user_id === $user->id;
//        $offeredProductIsFromUser = $product->offeredSolicituds->contains('offered_product_id', $product->id);
        $productDoesntHaveATrueque = !$product->hasTrueque;

        return ($productIsFromUser) && $productDoesntHaveATrueque;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user, Product $product): Response
    {
        if($user->isAdmin()){
            return Response::deny('El administrador no puede realizar solicitudes de trueque');
        }
        else if($user->isEmpleado()){
            return Response::deny('Un empleado no puede realizar solicitudes de trueque');
        }
        else if($product->trashed()){
            return Response::deny('No podés solicitar un trueque de un producto eliminado');
        }

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
     * Determine whether the user can create models.
     */
    public function accept(Authenticatable $user, Solicitud $solicitud, Product $product): Response
    {
        if($user->isAdmin()){
            return Response::deny('El administrador no puede aceptar solicitudes de trueque');
        }
        else if($user->isEmpleado()){
            return Response::deny('Un empleado no puede aceptar solicitudes de trueque');
        }
        else if($product->trashed()){
            return Response::deny('No podés aceptar un trueque de un producto eliminado');
        }

        $productIsNotFromUser = $user->id !== $product->user_id;
        $productHasTrueque = $product->hasTrueque;
        $solicitudWasAccepted = $solicitud->wasAccepted;
        $solicitudWasRejected = $solicitud->wasRejected;
        $solicitudIsPaused = $solicitud->isPaused;

        if($productIsNotFromUser){
            return Response::deny('No sos el dueño del producto, no podés aceptar una solicitud de trueque!');
        }
        if($productHasTrueque){
            return Response::deny('El producto ya fue trocado!');
        }
        if($solicitudWasAccepted){
            return Response::deny('La solicitud ya fue aceptada!');
        }
        if($solicitudWasRejected){
            return Response::deny('La solicitud ya fue rechazada!');
        }
        if($solicitudIsPaused){
            return Response::deny('La solicitud está pausada porque alguno de los productos está matcheado');
        }
        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     */
    public function reject(Authenticatable $user, Solicitud $solicitud, Product $product): Response
    {
        if($user->isAdmin()){
            return Response::deny('El administrador no puede rechazar solicitudes de trueque');
        }
        else if($user->isEmpleado()){
            return Response::deny('Un empleado no puede rechazar solicitudes de trueque');
        }
        else if($product->trashed()){
            return Response::deny('No podés rechazar un trueque de un producto eliminado');
        }

        $productIsNotFromUser = $user->id !== $product->user_id;
        $productHasTrueque = $product->hasTrueque;
        $solicitudWasAccepted = $solicitud->wasAccepted;
        $solicitudWasRejected = $solicitud->wasRejected;
        $solicitudIsPaused = $solicitud->isPaused;

        if($productIsNotFromUser){
            return Response::deny('No sos el dueño del producto, no podés rechazar una solicitud de trueque!');
        }
        if($productHasTrueque){
            return Response::deny('El producto ya fue trocado!');
        }
        if($solicitudWasAccepted){
            return Response::deny('La solicitud ya fue aceptada!');
        }
        if($solicitudWasRejected){
            return Response::deny('La solicitud ya fue rechazada!');
        }
        if($solicitudIsPaused){
            return Response::deny('La solicitud está pausada porque alguno de los productos está matcheado');
        }
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
//    public function update(Authenticatable $user, Solicitud $solicitud): bool
//    {
//        //
//    }

    /**
     * Determine whether the user can delete the model.
     */
//    public function delete(Authenticatable $user, Solicitud $solicitud): bool
//    {
//        //
//    }
}
