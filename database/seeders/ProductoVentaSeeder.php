<?php

namespace Database\Seeders;

use App\Models\ProductoVenta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductoVentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductoVenta::factory()->count(20)->create();
    }
}
