<?php

namespace Database\Seeders;

use App\Models\Empleado;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmpleadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Empleado::factory()->create([
            'name' => 'Empleado 1',
            'dni' => '12341234',
            'sucursal_id' => 1,
            'password' => Hash::make('12341234'),
            'remember_token' => Str::random(10),
        ]);
        Empleado::factory()->create([
            'name' => 'Empleado 2',
            'dni' => '23452345',
            'sucursal_id' => 2,
            'password' => Hash::make('23452345'),
            'remember_token' => Str::random(10),
        ]);
    }
}
