<?php

namespace Database\Seeders;

use App\Models\Trueque;
use Illuminate\Database\Seeder;

class TruequeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trueque::factory(5)->create();
    }
}
