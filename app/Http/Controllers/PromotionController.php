<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PromotionController extends Controller
{

    public function success(Product $product): RedirectResponse
    {
        return to_route('product.show', $product->id)
            ->with('success', [
                'message' => 'Promoción efectuada con éxito.',
                'key' => $product->id,
            ]);
    }

    public function cancel(Product $product): RedirectResponse
    {
        return to_route('product.show', $product->id)
            ->with('error', [
                'message' => 'La promoción no fue efectuada.',
                'key' => $product->id,
            ]);
    }
}
