<?php

namespace Database\Factories;

use App\Models\Sucursal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'category' => fake()->numberBetween(1, 3),
            'image_path' => fake()->imageUrl(),
            'description' => fake()->sentence(),
            'promoted_at' => fake()->dateTime(),
            'user_id' => fake()->numberBetween(1, User::count()),
            'sucursal_id' => fake()->numberBetween(1, Sucursal::count()),
        ];
    }
}
