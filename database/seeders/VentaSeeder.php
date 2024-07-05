<?php

namespace Database\Seeders;

use App\Models\ProductoVenta;
use App\Models\Trueque;
use App\Models\Venta;
use Illuminate\Database\Seeder;

class VentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Venta::factory()->count(100)->create()->each(function ($venta) {
            $venta->created_at = $venta->created_at->subDays(rand(1, 30));
            Trueque::factory()->create(['venta_id' => $venta->id]);

            // Assuming you have a method to associate ProductoVenta with Trueque
            ProductoVenta::factory()->count(10)->create(['venta_id' =>  $venta->id]);
        });
    }
}
