<?php

namespace App\Http\Controllers\Auth;
use App\Http\Resources\SucursalResource;

use App\Http\Controllers\Controller;
use App\Models\Sucursal;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $sucursales = Sucursal::all();
        return Inertia::render('Auth/Register', [
            'sucursales' => SucursalResource::collection($sucursales)
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $data=$request->validate([
            'name' => ['required', 'string', 'max:255', 'regex:/^[\pL\s\-]+$/u'],
            'surname' => ['required', 'string', 'max:255', 'regex:/^[\pL\s\-]+$/u'],
            'birth_date' => ['required', 'date', 'before:18 years ago'],
            'sucursal_id' => ['required', 'exists:sucursals,id'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', Rules\Password::min(6), 'confirmed'],
        ]);

        $data['password'] = bcrypt($data['password']);
        $data['reputation'] = 0;

        $user = User::create($data);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
