<?php

use App\Models\Tree;
use Database\Seeders\TreeSeeder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedGeoJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * @throws JsonException
     */
    public function up(): void
    {
        $seeder = app(TreeSeeder::class);
        $seeder->run();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Tree::truncate();
    }
}
