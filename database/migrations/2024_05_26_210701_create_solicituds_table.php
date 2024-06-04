<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicituds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('published_product_id')->constrained('products');
            $table->foreignId('offered_product_id')->constrained('products');
            $table->dateTime('meeting_date_time');
            $table->enum('state', ['normal', 'accepted', 'frozen', 'rejected']);
            $table->softDeletes();
            $table->timestamps();
        });

        // Add conditional unique index on published_product_id, offered_product_id and was_rejected
        DB::statement('CREATE UNIQUE INDEX solicituds_published_offered_not_rejected_unique ON solicituds (published_product_id, offered_product_id) WHERE was_rejected = false');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the conditional unique index
        DB::statement('DROP INDEX solicituds_published_offered_not_rejected_unique');
        Schema::dropIfExists('solicituds');
    }
};
