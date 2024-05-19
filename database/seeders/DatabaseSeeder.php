<?php

namespace Database\Seeders;

use App\Models\Sucursal;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        Sucursal::factory(5)->create();

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

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'password' => bcrypt('12341234'),
        ]);

//        User::factory(4)->hasProducts(10)->create();
    }
}
