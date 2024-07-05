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
//            TruequeSeeder::class,
            // Solo está ventaSeeder porque crea productosVenta y trueques que crean solicitudes que crean productos
            VentaSeeder::class,
            CommentSeeder::class,
            AdminSeeder::class,
            EmpleadoSeeder::class,
            TruequeErrorSeeder::class,
        ]);
    }
}
