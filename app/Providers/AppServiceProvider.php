<?php

namespace App\Providers;

use DragonCode\Contracts\Cashier\Resources\Model;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        EloquentModel::preventSilentlyDiscardingAttributes(true);
        JsonResource::withoutWrapping();
    }
}
