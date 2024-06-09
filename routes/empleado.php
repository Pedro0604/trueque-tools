<?php

use App\Http\Controllers\Empleado\Auth\EmpleadoAuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::as('empleado.')->group(function () {
    Route::middleware('guest:empleado')->group(function () {
        Route::get('login', [EmpleadoAuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [EmpleadoAuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:empleado')->group(function () {
        Route::post('logout', [EmpleadoAuthenticatedSessionController::class, 'destroy'])
            ->name('logout');
    });
});
