<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Auth\Authenticatable;

class UserPolicy
{

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user): Response
    {
        if ($user->isAdmin()) {
            return Response::deny('Un administrador no puede eliminar su cuenta');
        } else if ($user->isEmpleado()) {
            return Response::deny('Un empleado no puede eliminar su cuenta');
        }

        $hasProductsWithTrueque = $user->products()
            ->where(function ($query) {
                $query->whereHas('publishedPendingTrueque')
                    ->orWhereHas('offeredPendingTrueque');
            })->exists();

        if ($hasProductsWithTrueque) {
            return Response::deny('No podés eliminar tu cuenta porque tenés trueques pendientes asociados a la misma. Cancelalos antes de proceder con la eliminación');
        }
        return Response::allow();
    }
}
