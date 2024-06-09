<?php

use App\Http\Controllers\Admin\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\SucursalController;
use Illuminate\Support\Facades\Route;

Route::as('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AdminAuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:admin')->group(function () {
        Route::post('logout', [AdminAuthenticatedSessionController::class, 'destroy'])
            ->name('logout');

        Route::get('empleado', [EmpleadoController::class, 'index'])->name('empleado.index');

        Route::get('sucursal/create', [SucursalController::class, 'create'])->name('sucursal.create');
        Route::post('sucursal', [SucursalController::class, 'store'])->name('sucursal.store');

        Route::get('empleado/create', [EmpleadoController::class, 'create'])->name('empleado.create');
        Route::post('empleado', [EmpleadoController::class, 'store'])->name('empleado.store');
    });
});
