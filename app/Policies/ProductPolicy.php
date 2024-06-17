<?php

namespace App\Policies;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;

class ProductPolicy
{
    public function promote(Authenticatable $user, Product $product)
    {
        if($user->isAdmin() || $user->isEmpleado()){
            return false;
        }

        $productIsFromUser = $product->user_id === $user->id;
        $productIsCurrentlyPromoted = $product->promoted_at && (new Carbon($product->promoted_at))->gt(Carbon::now()->subWeek());

        return $productIsFromUser && !$productIsCurrentlyPromoted;
    }
}
