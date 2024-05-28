<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Solicitud>
 */
class SolicitudFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'published_product_id' => fake()->numberBetween(1, Product::count()),
            'offered_product_id' => fake()->numberBetween(1, Product::count()),
            'meeting_date_time' => fake()->dateTimeBetween('now', '+1 year'), // '2023-05-26 21:07:01
            'was_rejected' => false,
        ];
    }
}
