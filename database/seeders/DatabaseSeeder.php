<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        $this->call([
//            SucursalSeeder::class,
//            UserSeeder::class,
////            ProductSeeder::class,
////            SolicitudSeeder::class,
//        // Solo está truequeSeeder porque crea solicitudes que crean productos
//            TruequeSeeder::class,
//            CommentSeeder::class,
//            AdminSeeder::class,
//            EmpleadoSeeder::class,
//        ]);

        $this->call([
            AdminSeeder::class,
        ]);

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
    }
}
