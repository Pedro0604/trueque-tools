<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Admin;
use App\Models\TruequeError;
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
        Admin::factory()->create();
        TruequeError::factory()->create(['message' => 'El usuario canceló el trueque.']);
        TruequeError::factory()->create(['message' => 'El usuario no se presentó al trueque.']);
        TruequeError::factory()->create(['message' => 'El usuario no trajo ningún producto.']);
        TruequeError::factory()->create(['message' => 'El usuario trajo otro producto.']);
    }
}
