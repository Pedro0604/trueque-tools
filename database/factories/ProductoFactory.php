<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->name(),
            'categoria' => fake()->numberBetween(1, 3),
            'foto_url' => fake()->imageUrl(),
            'descripcion' => fake()->sentence(),
            'promoted_at' => fake()->dateTime(),
            'user_id' => fake()->numberBetween(1,3),
            'sucursal_id' => fake()->numberBetween(1,3),
        ];
    }
}
