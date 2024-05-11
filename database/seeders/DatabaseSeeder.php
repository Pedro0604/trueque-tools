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
        Sucursal::factory(5)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'password' => bcrypt('12341234'),
        ]);

        User::factory(4)->hasProducts(10)->create();
    }
}
