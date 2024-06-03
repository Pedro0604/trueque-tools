<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Solicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Solicitud::factory(rand(Product::count(), Product::count() * 4))->create();
    }
}
