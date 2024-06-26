<?php

namespace Database\Seeders;

use App\Models\ProductoVenta;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SucursalSeeder::class,
            UserSeeder::class,
//            ProductSeeder::class,
//            SolicitudSeeder::class,
        // Solo está truequeSeeder porque crea solicitudes que crean productos
            TruequeSeeder::class,
            VentaSeeder::class,
            ProductoVentaSeeder::class,
            CommentSeeder::class,
            AdminSeeder::class,
            EmpleadoSeeder::class,
            TruequeErrorSeeder::class,
        ]);
    }
}
