<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\SucursalController;
use App\Http\Controllers\TruequeController;
use App\Http\Controllers\VentaController;
use App\Models\Comment;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/product');

Route::middleware('auth:web')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Product routes
    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('/product', [ProductController::class, 'store'])->name('product.store')->middleware(HandlePrecognitiveRequests::class);
    Route::get('/product/my-products', [ProductController::class, 'myProducts'])->name('product.myProducts');
    Route::get('/product/{product}/edit', [ProductController::class, 'edit'])->name('product.edit');
    Route::put('/product/{product}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');

    // Comment routes
    Route::post('/product/{product}/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::post('/comment/{comment}', [CommentController::class, 'respond'])->name('comment.respond');
    Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');

    // Solicitud routes
    Route::get('product/{product}/solicitud/create', [SolicitudController::class, 'create'])->name('solicitud.create');
    Route::post('product/{product}/solicitud', [SolicitudController::class, 'store'])->name('solicitud.store');
    Route::get('/solicitud/my-solicitudes-recibidas', [SolicitudController::class, 'mySolicitudsReceived'])->name('solicitud.mySolicitudsReceived');
    Route::get('/solicitud/my-solicitudes-enviadas', [SolicitudController::class, 'mySolicitudsSent'])->name('solicitud.mySolicitudsSent');
    Route::post('product/{product}/solicitud/{solicitud}/accept', [SolicitudController::class, 'accept'])->name('solicitud.accept');
    Route::post('product/{product}/solicitud/{solicitud}/reject', [SolicitudController::class, 'reject'])->name('solicitud.reject');

    // Trueque routes
    Route::get('/trueque/my-trueques', [TruequeController::class, 'myTrueques'])->name('trueque.myTrueques');
    Route::post('/trueque/{trueque}/cancel', [TruequeController::class, 'cancel'])->name('trueque.cancel');
});

Route::get('/product', [ProductController::class, 'index'])->name('product.index');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

// Rutas accesibles por todos los usuarios
Route::middleware('auth:web,admin,empleado')->group(function (){
    Route::get('/trueque/{trueque}', [TruequeController::class, 'show'])->name('trueque.show');

    // Sucursal routes
    Route::get('/sucursal', [SucursalController::class, 'index'])->name('sucursal.index');
});

// Rutas accesibles por administrador y empleado
Route::middleware('auth:admin,empleado')->group(function (){
    // Trueque routes
    Route::get('/trueque', [TruequeController::class, 'index'])->name('trueque.index');
    Route::post('/trueque/{trueque}/end', [TruequeController::class, 'end'])->name('trueque.end');
    Route::get('/trueque/{trueque}/fail', [TruequeController::class, 'failForm'])->name('trueque.failForm');
    Route::post('/trueque/{trueque}/fail', [TruequeController::class, 'fail'])->name('trueque.fail');

    // Venta routes
    Route::get('/trueque/{trueque}/venta/create', [VentaController::class, 'create'])->name('venta.create');
    Route::post('/trueque/{trueque}/venta', [VentaController::class, 'store'])->name('venta.store');
    Route::post('/venta/{venta}', [VentaController::class, 'show'])->name('venta.show');
    Route::get('/venta', [VentaController::class, 'index'])->name('venta.index');
});

require __DIR__.'/auth.php';
