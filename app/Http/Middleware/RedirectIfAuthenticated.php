<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Route;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if (Route::is('admin.*')) {
                    Auth::shouldUse('admin');
                    return redirect(env('APP_URL') . env('ADMIN_HOME'));
                } elseif (Route::is('empleado.*')) {
                    Auth::shouldUse('empleado');
                    return redirect(env('APP_URL') . env('EMPLEADO_HOME'));
                } else {
                    Auth::shouldUse('web');
                    return redirect(env('APP_URL') . '/');
                }
            }
        }
        return $next($request);
    }
}
