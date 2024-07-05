<?php

namespace Database\Factories;

use App\Models\Solicitud;
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
        $hasEnded = fake()->boolean(80);

        return [
            'ended_at' => $hasEnded ? fake()->dateTimeBetween('-2 weeks', 'now') : null,
            'is_failed' => fake()->boolean(10),
            'solicitud_id' => Solicitud::factory(),
            'code' => fake()->unique()->text(10),
        ];
    }
}
