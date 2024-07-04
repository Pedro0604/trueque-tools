<?php

namespace App\Policies;

use App\Models\Trueque;
use App\Models\Venta;
use Illuminate\Contracts\Auth\Authenticatable;

class VentaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Authenticatable $user): bool
    {
        if ($user->isEmpleado() || $user->isAdmin()) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user, Trueque $trueque): bool
    {
        if ($user->isEmpleado() || $user->isAdmin()) {
            $hasEnded = $trueque->ended_at;
            $wasSuccessful = !$trueque->is_failed;
            $doesntHaveVenta = !$trueque->venta;
            return $hasEnded && $wasSuccessful && $doesntHaveVenta;
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Authenticatable $user, Venta $venta): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Venta $venta): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Authenticatable $user, Venta $venta): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Authenticatable $user, Venta $venta): bool
    {
        //
    }
}
