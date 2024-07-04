<?php

namespace App\Policies;

use App\Models\Sucursal;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Auth\Authenticatable;

class SucursalPolicy
{

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Sucursal $sucursal): Response
    {
        if ($user->isEmpleado()) {
            return Response::deny('Un empleado no puede eliminar una sucursal');
        }
        if (!$user->isAdmin()) {
            return Response::deny('No tenés permisos para eliminar esta sucursal');
        }

        if ($sucursal->empleados()->count() > 0) {
            return Response::deny('No podés eliminar una sucursal con empleados asignados');
        }

        return Response::allow();
    }
}
