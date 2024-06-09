<?php

namespace Database\Factories;

use App\Models\Sucursal;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Empleado>
 */
class EmpleadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Empleado' . rand(0, 9),
            'dni' => '12341234',
            'sucursal_id' => rand(1, Sucursal::all()->count()),
            'password' => Hash::make('12341234'),
            'remember_token' => Str::random(10),
        ];
    }
}
