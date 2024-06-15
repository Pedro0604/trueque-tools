<?php

namespace Database\Factories;

use App\Models\Trueque;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venta>
 */
class VentaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'total' => $this->faker->randomFloat(2, 0, 999999),
            'trueque_id' => rand(1, Trueque::count()),
            'user_id' => rand(1, User::count()),
        ];
    }
}
