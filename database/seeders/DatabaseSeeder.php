<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Comment;
use App\Models\Empleado;
use App\Models\Product;
use App\Models\ProductoVenta;
use App\Models\Solicitud;
use App\Models\Sucursal;
use App\Models\Trueque;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::factory()->create();

        Sucursal::factory()->create([
            'name' => 'Sucursal 1',
            'address' => 'Calle 1 n°1234',
            'code' => '12345',
        ]);
        Sucursal::factory()->create([
            'name' => 'Sucursal 2',
            'address' => 'Calle 2 n°2345',
            'code' => '23456',
        ]);

        Empleado::factory()->create([
            'name' => 'Empleado 1',
            'dni' => '12341234',
            'sucursal_id' => 1,
            'password' => Hash::make('12341234'),
            'remember_token' => Str::random(10),
        ]);
        Empleado::factory()->create([
            'name' => 'Empleado 2',
            'dni' => '23452345',
            'sucursal_id' => 2,
            'password' => Hash::make('23452345'),
            'remember_token' => Str::random(10),
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
        User::factory()->create([
            'name' => 'Test User 3',
            'email' => 'test3@gmail.com',
            'password' => bcrypt('12341234'),
        ]);
        User::factory()->create([
            'name' => 'Test User 4',
            'email' => 'test4@gmail.com',
            'password' => bcrypt('12341234'),
        ]);

        // Producto 1
        Product::factory()->create([
            'name' => 'Producto promocionado',
            'category' => 1,
            'image_path' => null,
            'description' => fake()->sentence(),
            'promoted_at' => fake()->dateTimeBetween('-1 weeks'),
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 2
        Product::factory()->create([
            'name' => 'Producto con trueque pendiente',
            'category' => 1,
            'image_path' => null,
            'description' => fake()->sentence(),
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 3
        Product::factory()->create([
            'name' => 'Producto de prueba',
            'category' => 1,
            'image_path' => null,
            'description' => fake()->sentence(),
            'promoted_at' => null,
            'user_id' => 3,
            'sucursal_id' => 1,
        ]);

        // Solicitud 1 (Producto 2 y 3)
        Solicitud::factory()->create([
            'published_product_id' => 2,
            'offered_product_id' => 3,
            'meeting_date_time' => fake()->dateTimeBetween('now', '+2 weeks'),
            'state' => 'accepted',
        ]);

        // Trueque 1 (Solicitud 1)
        Trueque::factory()->create([
            'ended_at' => null,
            'is_failed' => false,
            'solicitud_id' => 1,
            'code' => fake()->unique()->text(10),
        ]);

        // Producto 4
        Product::factory()->create([
            'name' => 'Producto sin nada',
            'category' => 1,
            'image_path' => null,
            'description' => fake()->sentence(),
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 5
        Product::factory()->create([
            'name' => 'Producto a modificar y después eliminar',
            'category' => 1,
            'image_path' => null,
            'description' => fake()->sentence(),
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Comentario 1 (Producto 5 - Respondido por el comentario 2)
        Comment::factory()->create([
            'text' => 'Cuál es la condición?',
            'user_id' => 2,
            'product_id' => 5,
            'response_id' => null,
        ]);

        // Comentario 2 (Producto 5 - Respuesta al Comentario 1)
        Comment::factory()->create([
            'text' => 'Pésima',
            'user_id' => 1,
            'product_id' => null,
            'response_id' => null,
        ]);
        Comment::find(1)->update(['response_id' => 2]);

        // Comentario 3 (Producto 2 - Respondido por el comentario 4)
        Comment::factory()->create([
            'text' => 'Tiene detalles?',
            'user_id' => 2,
            'product_id' => 2,
            'response_id' => null,
        ]);

        // Comentario 4 (Producto 2 - Respuesta al Comentario 3)
        Comment::factory()->create([
            'text' => 'Muchos',
            'user_id' => 1,
            'product_id' => null,
            'response_id' => null,
        ]);

        Comment::find(3)->update(['response_id' => 4]);

        Sucursal::factory()->create([
            'name' => 'Sucursal 3',
            'address' => 'Calle 3 n°3456',
            'code' => '34567',
        ]);
    }
}
