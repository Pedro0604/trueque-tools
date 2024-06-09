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
            $guards = $this->extractGuardsFromRoute($request);
            foreach ($guards as $guard) {
                if ($guard === 'admin') {
                    Auth::shouldUse('admin');
                    return route('admin.login');
                } elseif ($guard === 'empleado') {
                    Auth::shouldUse('empleado');
                    return route('empleado.login');
                } else {
                    Auth::shouldUse('web');
                    return route('login');
                }
            }
        }

        return null;
    }
    /**
     * Extract guards from the current route middleware.
     *
     * @param Request $request
     * @return array
     */
    protected function extractGuardsFromRoute(Request $request): array
    {
        // Get the middleware applied to the current route
        $routeMiddleware = $request->route()->gatherMiddleware();

        // Filter out the 'auth:' middleware and extract guards
        $guards = [];

        foreach ($routeMiddleware as $middleware) {
            if (strpos($middleware, 'auth:') === 0) {
                $guardsString = substr($middleware, strlen('auth:'));
                $guards = array_merge($guards, explode(',', $guardsString));
            }
        }

        return $guards;
    }
}
