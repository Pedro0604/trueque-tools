<?php

namespace Database\Seeders;

use App\Models\TruequeError;
use Illuminate\Database\Seeder;

class TruequeErrorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TruequeError::factory()->create(['message' => 'El usuario canceló el trueque.']);
        TruequeError::factory()->create(['message' => 'El usuario no se presentó al trueque.']);
        TruequeError::factory()->create(['message' => 'El usuario no trajo ningún producto.']);
        TruequeError::factory()->create(['message' => 'El usuario trajo otro producto.']);
    }
}
