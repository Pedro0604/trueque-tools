<?php

namespace Database\Seeders;

use App\Models\Sucursal;
use Illuminate\Database\Seeder;

class SucursalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sucursal::factory()->create([
            'name' => 'Sucursal 1',
            'address' => 'Calle 1 n°1234',
            'code' => '12345',
        ]);
        Sucursal::factory()->create([
            'name' => 'Sucursal 2',
            'address' => 'Calle 2 n°2345',
            'code' => '23456',
        ]);
        Sucursal::factory()->create([
            'name' => 'Sucursal 3',
            'address' => 'Calle 3 n°3456',
            'code' => '34567',
        ]);
        Sucursal::factory()->create([
            'name' => 'Sucursal 4',
            'address' => 'Calle 4 n°4567',
            'code' => '45678',
        ]);
        Sucursal::factory()->create([
            'name' => 'Sucursal 5',
            'address' => 'Calle 5 n°5678',
            'code' => '56789',
        ]);
    }
}
