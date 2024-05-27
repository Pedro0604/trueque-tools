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
        Schema::create('trueques', function (Blueprint $table) {
            $table->id();
            $table->dateTime('ended_at')->nullable();
            $table->boolean('is_failed')->default(false);
            $table->foreignId('solicitud_id')->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trueques');
    }
};
