<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'password' => bcrypt('12341234'),
        ]);
        User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@gmail.com',
            'password' => bcrypt('12341234'),
        ]);

        User::factory(2)->create();
    }
}
