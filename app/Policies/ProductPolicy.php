<?php

namespace App\Policies;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
    public function promote(Authenticatable $user, Product $product)
    {
        if ($user->isAdmin() || $user->isEmpleado()) {
            return false;
        }

        $productIsFromUser = $product->user_id === $user->id;
        $productIsCurrentlyPromoted = $product->promoted_at && (new Carbon($product->promoted_at))->gt(Carbon::now()->subWeek());
        $productHasTrueque = $product->hasTrueque;

        return $productIsFromUser && !$productIsCurrentlyPromoted && !$productHasTrueque;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Authenticatable $user, Product $product): Response
    {
        if ($user->isAdmin()) {
            return Response::deny('El administrador no puede modificar productos');
        } else if ($user->isEmpleado()) {
            return Response::deny('Un empleado no puede modificar productos');
        }

        $productIsNotFromUser = $product->user_id !== $user->id;
        $productHasATrueque = $product->hasTrueque;
        $productHasSolicituds = $product->solicituds()->where('state', '<>', 'rejected')->count() > 0 || $product->offeredSolicituds()->where('state', '<>', 'rejected')->count() > 0;

        if ($productIsNotFromUser) {
            return Response::deny('No podés modificar un producto que no es tuyo');
        }
        if ($productHasSolicituds) {
            return Response::deny('No podés modificar un producto que tiene solicitudes pendientes');
        }

        if ($productHasATrueque) {
            return Response::deny('No podés modificar un producto con un trueque pactado');
        }
        return Response::allow();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Product $product): Response
    {
        if ($user->isAdmin()) {
            return Response::deny('El administrador no puede eliminar productos');
        } else if ($user->isEmpleado()) {
            return Response::deny('Un empleado no puede eliminar productos');
        }

        $productIsNotFromUser = $product->user_id !== $user->id;
        $productHasATrueque = $product->hasTrueque;


        if ($productIsNotFromUser) {
            return Response::deny('No podés eliminar un producto que no es tuyo');
        }
        if ($productHasATrueque) {
            return Response::deny('No podés eliminar un producto con un trueque pactado');
        }
        return Response::allow();
    }
}
