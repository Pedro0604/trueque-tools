<?php

namespace App\Http\Controllers\Empleado\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Empleado\Auth\EmpleadoLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class EmpleadoAuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Empleado/Auth/EmpleadoLogin', [
            'canResetPassword' => false,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(EmpleadoLoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        Auth::guard('admin')->logout();
        Auth::guard('web')->logout();

        $request->session()->regenerate();

        return redirect()->intended(env('EMPLEADO_HOME'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('empleado')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(env('EMPLEADO_HOME'));
    }
}
