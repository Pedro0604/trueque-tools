<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->integer('categoria');
            $table->string('foto_url')->nullable();
            $table->longText('descripcion');
            $table->dateTime('promoted_at')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('sucursal_id')->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
