<?php

use App\Http\Controllers\Admin\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
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

        Route::as('statistics.')->prefix('statistics')->group(function () {
            Route::get('most-trueques', [AdminController::class, 'showMostTruequesUsers'])
                ->name('mostTrueques');
            Route::get('trueques-between-dates', [AdminController::class, 'showTruequesBetweenDates'])
                ->name('truequesBetweenDates');
            Route::get('ventas-between-dates', [AdminController::class, 'showVentasBetweenDates'])
                ->name('ventasBetweenDates');
        });

        // Rutas usuarios
        Route::get('user', [UserController::class, 'index'])->name('user.index');

        // Rutas empleados
        Route::get('empleado', [EmpleadoController::class, 'index'])->name('empleado.index');
        Route::get('empleado/create', [EmpleadoController::class, 'create'])->name('empleado.create');
        Route::post('empleado', [EmpleadoController::class, 'store'])->name('empleado.store')->middleware(HandlePrecognitiveRequests::class);
        Route::delete('empleado/{empleado}', [EmpleadoController::class, 'destroy'])->name('empleado.destroy');

        // Rutas sucursales
        Route::get('sucursal/create', [SucursalController::class, 'create'])->name('sucursal.create');
        Route::post('sucursal', [SucursalController::class, 'store'])->name('sucursal.store')->middleware(HandlePrecognitiveRequests::class);
    });
});
