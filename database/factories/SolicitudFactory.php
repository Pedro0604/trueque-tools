<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Solicitud;
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
            'published_product_id' => Product::factory(),
            'offered_product_id' => Product::factory(),
            'meeting_date_time' => $this->faker->dateTimeBetween('now', '+1 year'),
            'was_rejected' => $this->faker->boolean(),
        ];
    }
}
