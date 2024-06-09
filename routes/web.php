<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\TruequeController;
use App\Models\Comment;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/product');

Route::middleware('auth:web')->group(function () {
    // TODO - DESCOMENTAR CUANDO SE NECESITE EL DASHBOARD
//    Route::get('/dashboard', function () {
//        return Inertia::render('Dashboard');
//    })->name('dashboard');

    // TODO - DESCOMENTAR CUANDO SE PUEDA EDITAR / ELIMINAR UN USUARIO
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Product routes
    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('/product', [ProductController::class, 'store'])->name('product.store')->middleware(HandlePrecognitiveRequests::class);
    Route::get('/product/my-products', [ProductController::class, 'myProducts'])->name('product.myProducts');

    // Comment routes
    Route::post('/product/{product}/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::post('/comment/{comment}', [CommentController::class, 'respond'])->name('comment.respond');

    // Solicitud routes
    Route::get('product/{product}/solicitud/create', [SolicitudController::class, 'create'])->name('solicitud.create');
    Route::post('product/{product}/solicitud', [SolicitudController::class, 'store'])->name('solicitud.store');
    Route::post('product/{product}/solicitud/{solicitud}/accept', [SolicitudController::class, 'accept'])->name('solicitud.accept');
    Route::post('product/{product}/solicitud/{solicitud}/reject', [SolicitudController::class, 'reject'])->name('solicitud.reject');

    // Trueque routes
    Route::get('/trueque/my-trueques', [TruequeController::class, 'myTrueques'])->name('trueque.myTrueques');

    // TODO - DESCOMENTAR CUANDO SE PUEDA EDITAR / ELIMINAR UN PRODUCTO
//    Route::get('/product/{product}/edit', [ProductController::class, 'edit'])->name('product.edit');
//    Route::put('/product/{product}', [ProductController::class, 'update'])->name('product.update');
//    Route::delete('/product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
});

Route::get('/product', [ProductController::class, 'index'])->name('product.index');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

// Rutas accesibles por usuarios y administrador
Route::middleware('auth:web,admin')->group(function (){
    Route::get('/trueque/{trueque}', [TruequeController::class, 'show'])->name('trueque.show');
});

// Rutas accesibles por administrador y empleado
Route::middleware('auth:admin,empleado')->group(function (){
    Route::get('/trueque', [TruequeController::class, 'index'])->name('trueque.index');
});

require __DIR__.'/auth.php';
