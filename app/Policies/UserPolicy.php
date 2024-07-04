<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): Response
    {
        $hasProductsWithTrueque = $user->products()
            ->whereHas('publishedPendingTrueque')
            ->orWhereHas('offeredPendingTrueque')
            ->exists();

        if($hasProductsWithTrueque){
            return Response::deny('No podés eliminar tu cuenta porque tenés trueques pendientes asociados a la misma. Cancelalos antes de proceder con la eliminación');
        }
        return Response::allow();
    }
}
