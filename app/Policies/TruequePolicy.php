<?php

namespace App\Policies;

use App\Models\Trueque;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TruequePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Trueque $trueque): bool
    {
        $truequeIsFromUser = $user->id === $trueque->solicitud->publishedProduct->user->id;
        return $truequeIsFromUser || $user->id === $trueque->solicitud->offeredProduct->user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Trueque $trueque): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Trueque $trueque): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Trueque $trueque): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Trueque $trueque): bool
    {
        //
    }
}
