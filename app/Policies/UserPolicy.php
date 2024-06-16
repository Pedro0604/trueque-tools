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
        $hasComments = $user->comments()->count() > 0;
        $hasProducts = $user->products()->count() > 0;
        $hasVentas = $user->ventas()->count() > 0;


        if($hasComments){
            return Response::deny('No podés eliminar tu cuenta porque tenés comentarios asociados a la misma');
        }
        if($hasProducts){
            return Response::deny('No podés eliminar tu cuenta porque tenés productos asociados a la misma');
        }
        if($hasVentas){
            return Response::deny('No podés eliminar tu cuenta porque tenés ventas asociadas a la misma');
        }
        return Response::allow();
    }
}
