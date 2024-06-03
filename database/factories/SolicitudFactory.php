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
        $was_rejected = $this->faker->boolean(30); // 30% chance that the solicitud is rejected

        if ($was_rejected) {
            return [
                'published_product_id' => $this->faker->numberBetween(1, Product::count()),
                'offered_product_id' => $this->faker->numberBetween(1, Product::count()),
                'meeting_date_time' => $this->faker->dateTimeBetween('now', '+1 year'), // '2023-05-26 21:07:01
                'was_rejected' => $was_rejected,
            ];
        } else {
            // Get unique combinations of published_product_id and offered_product_id
            $published_product_id = Product::all()->random()->id;
            $offered_product_id = Product::where('id', '!=', $published_product_id)->get()->random()->id;

            return [
                'published_product_id' => $published_product_id,
                'offered_product_id' => $offered_product_id,
                'meeting_date_time' => $this->faker->dateTimeBetween('now', '+1 year'), // '2023-05-26 21:07:01
                'was_rejected' => $was_rejected,
            ];
        }
    }
}
