<?php

namespace App\Policies;

use App\Models\Trueque;
use Illuminate\Contracts\Auth\Authenticatable;

class TruequePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Authenticatable $user): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user, Trueque $trueque): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            return true;
        }

        $truequeIsFromUser = $user->id === $trueque->solicitud->publishedProduct->user->id;
        return $truequeIsFromUser || $user->id === $trueque->solicitud->offeredProduct->user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Authenticatable $user, Trueque $trueque): bool
    {
        //
    }

    /**
     * Determine whether the user can cancel a trueque.
     */
    public function cancel(Authenticatable $user, Trueque $trueque): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            return false;
        }

        $truequeIsFromUser = $user->id === $trueque->solicitud->publishedProduct->user->id;
        $truequeWasOfferedByUser = $user->id === $trueque->solicitud->offeredProduct->user->id;
        $truequeIsPending = !$trueque->ended_at;
        return ($truequeIsFromUser || $truequeWasOfferedByUser) && $truequeIsPending;
    }

    /**
     * Determine whether the user can end a trueque.
     */
    public function end(Authenticatable $user, Trueque $trueque): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            $hasEnded = $trueque->ended_at;
            return !$hasEnded;
        }
        return false;
    }

    /**
     * Determine whether the user can end a trueque.
     */
    public function fail(Authenticatable $user, Trueque $trueque): bool
    {
        if($user->isEmpleado() || $user->isAdmin()){
            $hasEnded = $trueque->ended_at;
            return !$hasEnded;
        }
        return false;
    }


    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Trueque $trueque): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Authenticatable $user, Trueque $trueque): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Authenticatable $user, Trueque $trueque): bool
    {
        //
    }
}
