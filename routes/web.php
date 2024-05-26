<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Comment;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/product');

Route::middleware('auth')->group(function () {
    // TODO - DESCOMENTAR CUANDO SE NECESITE EL DASHBOARD
//    Route::get('/dashboard', function () {
//        return Inertia::render('Dashboard');
//    })->name('dashboard');

    // TODO - DESCOMENTAR CUANDO SE PUEDA EDITAR / ELIMINAR UN USUARIO
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('/product', [ProductController::class, 'store'])->name('product.store')->middleware(HandlePrecognitiveRequests::class);

    // TODO - DESCOMENTAR CUANDO SE PUEDA EDITAR / ELIMINAR UN PRODUCTO
//    Route::get('/product/{product}/edit', [ProductController::class, 'edit'])->name('product.edit');
//    Route::put('/product/{product}', [ProductController::class, 'update'])->name('product.update');
//    Route::delete('/product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
});

Route::get('/product', [ProductController::class, 'index'])->name('product.index');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

Route::post('/product/{product}/comment', [Comment::class, 'store'])->name('comment.store')->middleware(HandlePrecognitiveRequests::class);

require __DIR__.'/auth.php';
