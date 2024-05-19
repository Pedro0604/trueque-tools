<?php

namespace App\Http\Controllers\Auth;
use App\Http\Requests\Auth\StoreRegisteredUserRequest;
use App\Http\Resources\SucursalResource;

use App\Http\Controllers\Controller;
use App\Models\Sucursal;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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
    public function store(StoreRegisteredUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);
        $data['reputation'] = 0;

        $user = User::create($data);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/');
    }
}
