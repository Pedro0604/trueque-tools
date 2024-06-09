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
        $hasEnded = fake()->boolean(30);

        return [
            'ended_at' => $hasEnded ? fake()->dateTime() : null,
            'is_failed' => fake()->boolean(80),
            'solicitud_id' => Solicitud::factory(),
            'code' => fake()->unique()->text(10),
        ];
    }
}
