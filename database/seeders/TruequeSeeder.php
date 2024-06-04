<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Solicitud;
use App\Models\Trueque;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TruequeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trueque::factory(Solicitud::count())->create();
    }
}
