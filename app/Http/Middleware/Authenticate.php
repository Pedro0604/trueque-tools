<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (!$request->expectsJson()) {
            if (Route::is('admin.*')) {
                Auth::shouldUse('admin');
                return route('admin.login');
            } elseif (Route::is('empleado.*')) {
                Auth::shouldUse('empleado');
                return route('empleado.login');
            } else {
                Auth::shouldUse('web');
                return route('login');
            }
        }

        return null;
    }
}
