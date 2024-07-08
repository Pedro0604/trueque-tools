<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Product;
use App\Models\ProductoVenta;
use App\Models\Solicitud;
use App\Models\Sucursal;
use App\Models\Trueque;
use App\Models\User;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private int $cantidad_productos = 100;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

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

        $this->call([
            AdminSeeder::class,
            EmpleadoSeeder::class,
            UserSeeder::class,
            TruequeErrorSeeder::class,
        ]);

        // Producto 1
        Product::factory()->create([
            'name' => 'Producto promocionado',
            'category' => 1,
            'promoted_at' => fake()->dateTimeBetween('-1 weeks'),
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 2
        Product::factory()->create([
            'name' => 'Producto con trueque pendiente',
            'category' => 1,
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 3
        Product::factory()->create([
            'name' => 'Producto de prueba',
            'category' => 1,
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
            'name' => 'Producto a promocionar con MercadoPago',
            'category' => 2,
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 5
        Product::factory()->create([
            'name' => 'Producto a modificar y eliminar',
            'category' => 2,
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

        // Producto 6
        Product::factory()->create([
            'name' => 'Producto a promocionar con tarjeta',
            'category' => 2,
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 7
        Product::factory()->create([
            'name' => 'Producto sin nada',
            'category' => 2,
            'promoted_at' => null,
            'user_id' => 2,
            'sucursal_id' => 1,
        ]);


        // Datos para Leandro
        // Producto 8
        Product::factory()->create([
            'name' => 'Producto a agregar venta',
            'category' => 1,
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 1,
        ]);

        // Producto 9
        Product::factory()->create([
            'name' => 'Producto de prueba 2',
            'category' => 1,
            'promoted_at' => null,
            'user_id' => 3,
            'sucursal_id' => 1,
        ]);

        // Solicitud 2 (Producto 8 y 9)
        Solicitud::factory()->create([
            'published_product_id' => 8,
            'offered_product_id' => 9,
            'meeting_date_time' => now()->subDays(14),
            'state' => 'accepted',
        ]);

        // Trueque 2 (Solicitud 2)
        Trueque::factory()->create([
            'ended_at' => now()->subDays(14),
            'is_failed' => false,
            'solicitud_id' => 2,
            'code' => fake()->unique()->text(10),
        ]);

        // Producto 10
        Product::factory()->create([
            'name' => 'Producto a agregar venta 2',
            'category' => 1,
            'promoted_at' => null,
            'user_id' => 1,
            'sucursal_id' => 2,
        ]);

        // Producto 11
        Product::factory()->create([
            'name' => 'Producto de prueba 3',
            'category' => 1,
            'promoted_at' => null,
            'user_id' => 3,
            'sucursal_id' => 2,
        ]);

        // Solicitud 3 (Producto 10 y 11)
        Solicitud::factory()->create([
            'published_product_id' => 10,
            'offered_product_id' => 11,
            'meeting_date_time' => now()->subDays(14),
            'state' => 'accepted',
        ]);

        // Trueque 3 (Solicitud 3)
        Trueque::factory()->create([
            'ended_at' => now()->subDays(14),
            'is_failed' => false,
            'solicitud_id' => 3,
            'code' => fake()->unique()->text(10),
        ]);


        // Paso 1: Crear productos
        $products = Product::factory($this->cantidad_productos)->create([
            'category' => fake()->numberBetween(1, 2),
            'image_path' => null,
            'promoted_at' => null,
            'user_id' => fake()->numberBetween(2, 4),
            'sucursal_id' => fake()->numberBetween(1, 2),
        ]);

        // Paso 2: Crear solicitudes
        $solicitudes = collect();
        for ($i = 0; $i < ($this->cantidad_productos / 2); $i++) {
            $productPair = $this->findValidProductPair($products);
            $solicitud = Solicitud::factory()->create([
                'published_product_id' => $productPair[0]->id,
                'offered_product_id' => $productPair[1]->id,
                'meeting_date_time' => now()->subDays(rand(5, 30)),
                'state' => 'accepted',
            ]);
            $solicitudes->push($solicitud);
        }

        $trueques_previos = Trueque::count();

        // Paso 3: Crear un trueque para cada solicitud
        $solicitudes->each(function ($solicitud) {
            Trueque::factory()->create([
                'solicitud_id' => $solicitud->id,
                'ended_at' => $solicitud->meeting_date_time,
                'is_failed' => false,
            ]);
        });

        $productosFerreteria = [
            'Tornillo', 'Martillo', 'Taladro', 'Sierra', 'Clavo', 'Llave inglesa', 'Destornillador',
            'Alicate', 'Cinta métrica', 'Nivel láser', 'Tuerca', 'Arandela', 'Broca', 'Cincel', 'Escalera',
            'Guantes de trabajo', 'Gafas de seguridad', 'Mascarilla de protección', 'Pistola de calor',
            'Sierra de calar', 'Taladro percutor', 'Lijadora', 'Fresadora', 'Cepillo eléctrico', 'Soldador',
            'Metro', 'Martillo perforador', 'Detector de metales', 'Enchufe', 'Interruptor', 'Bombilla',
            'Cable eléctrico', 'Tubo de PVC', 'Pegamento', 'Sellador', 'Pintura', 'Rodillo de pintura',
            'Pincel', 'Espátula', 'Cinta de carrocero', 'Nivel de burbuja', 'Escuadra', 'Compás', 'Flexómetro',
            'Cortatubos', 'Serrucho', 'Maza', 'Pala', 'Pico', 'Rastrillo', 'Tijeras de podar', 'Manguera',
            'Regadera', 'Cubo', 'Esponja', 'Detergente', 'Desatascador', 'Tornillo de banco', 'Lima',
            'Sierra de mano', 'Grifo', 'Válvula', 'Tubo de cobre', 'Brida', 'Cortadora de césped', 'Motosierra',
            'Tronzadora', 'Generador eléctrico', 'Bomba de agua', 'Caja de herramientas', 'Taladro de columna',
            'Banco de trabajo', 'Linterna', 'Candado', 'Cuerda', 'Carretilla', 'Escalera telescópica',
            'Hormigonera', 'Nivel láser rotativo', 'Detector de vigas'
        ];

        // Crear una Venta para cada Trueque
        Trueque::all()->each(function ($trueque) use ($productosFerreteria, $trueques_previos) {
            if ($trueque->id > $trueques_previos) {
                $venta = new Venta();
                $venta->total = 0; // Inicializar el total en 0
                $venta->created_at = (new Carbon($trueque->ended_at))->addDays(rand(0, 5));
                $venta->save();

                $trueque->update(['venta_id' => $venta->id]);

                // Generar un número aleatorio de ProductoVenta para esta Venta
                $numProductos = rand(1, 5);
                $totalVenta = 0;

                for ($i = 0; $i < $numProductos; $i++) {
                    $productoVenta = new ProductoVenta();
                    $productoVenta->venta_id = $venta->id;
                    $productoVenta->name = $productosFerreteria[array_rand($productosFerreteria)];
                    $productoVenta->sell_price = rand(100, 1000); // Precio aleatorio entre 100 y 1000
                    $productoVenta->save();

                    // Sumar el precio del producto al total de la venta
                    $totalVenta += $productoVenta->sell_price;
                }

                // Actualizar el total de la Venta con la suma de los precios de ProductoVenta
                $venta->total = $totalVenta;
                $venta->save();
            }
        });

        Sucursal::factory()->create([
            'name' => 'Sucursal 3',
            'address' => 'Calle 3 n°3456',
            'code' => '34567',
        ]);
    }

    private function findValidProductPair($products)
    {
        $validPair = false;
        $attempts = 0;
        $maxAttempts = $this->cantidad_productos;

        while (!$validPair && $attempts < $maxAttempts) {
            $pair = $products->random(2);
            $existsNonRejectedSolicitud = Solicitud::where(function ($query) use ($pair) {
                $query->where('published_product_id', $pair[0]->id)
                    ->orWhere('offered_product_id', $pair[0]->id);
            })->orWhere(function ($query) use ($pair) {
                $query->where('published_product_id', $pair[1]->id)
                    ->orWhere('offered_product_id', $pair[1]->id);
            })->where('state', '!=', 'rejected')->exists();

            if (!$existsNonRejectedSolicitud && $pair[0]->user_id != $pair[1]->user_id && $pair[0]->category == $pair[1]->category) {
                $validPair = true;
            }
            $attempts++;
        }

        if (!$validPair) {
            // Fallback: Create a new product and pair it with a compatible existing product
            $newProduct = Product::factory()->create([
                'category' => $products->first()->category,
                'user_id' => User::whereNotIn('id', $products->pluck('user_id'))->inRandomOrder()->first()->id,
                'image_path' => null,
                'promoted_at' => null,
                'sucursal_id' => fake()->numberBetween(1, Sucursal::count()),
            ]);

            // Find an existing product that is compatible with the new product
            $compatibleProduct = $products->filter(function ($product) use ($newProduct) {
                return $product->user_id != $newProduct->user_id && $product->category == $newProduct->category;
            })->random();

            return [$newProduct, $compatibleProduct];
        }

        return $pair;
    }
}
