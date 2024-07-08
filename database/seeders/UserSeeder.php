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
            'surname' => 'User',
            'email' => 'test@gmail.com',
            'password' => bcrypt('12341234'),
        ]);
        User::factory()->create([
            'name' => 'Test User 2',
            'surname' => 'User 2',
            'email' => 'test2@gmail.com',
            'password' => bcrypt('12341234'),
        ]);
        User::factory()->create([
            'name' => 'Test User 3',
            'surname' => 'User 3',
            'email' => 'test3@gmail.com',
            'password' => bcrypt('12341234'),
        ]);
        User::factory()->create([
            'name' => 'Test User 4',
            'surname' => 'User 4',
            'email' => 'test4@gmail.com',
            'password' => bcrypt('12341234'),
        ]);
    }
}
