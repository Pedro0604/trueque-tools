<?php

namespace Database\Factories;

use App\Models\Solicitud;
use App\Models\Sucursal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trueque>
 */
class TruequeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ended_at' => fake()->dateTime(),
            'is_failed' => fake()->boolean(90),
            'solicitud_id' => Solicitud::factory(),
        ];
    }
}
