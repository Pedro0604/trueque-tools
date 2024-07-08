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
        // Ensure the description is at least 60 characters long
        $description = fake()->sentence();
        while (strlen($description) < 60) {
            $description .= ' ' . fake()->sentence();
        }

        return [
            'name' => fake()->name(),
            'category' => fake()->numberBetween(1, 3),
            'image_path' => fake()->imageUrl(),
            'description' => $description,
            'promoted_at' => fake()->optional(0.33)->dateTimeBetween('-2 weeks', 'now'),
            'user_id' => fake()->numberBetween(1, User::count()),
            'sucursal_id' => fake()->numberBetween(1, Sucursal::count()),
        ];
    }
}
