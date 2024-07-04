<?php

namespace Database\Factories;

use App\Models\Venta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductoVenta>
 */
class ProductoVentaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(2),
            'sell_price' => fake()->randomFloat(2, 50, 10000),
            'venta_id' => fake()->numberBetween(1, Venta::count()),
        ];
    }
}
