<?php

namespace Database\Seeders;

use App\Models\Tree;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \JsonException
     */
    public function run(): void
    {
        /** @noinspection JsonEncodingApiUsageInspection */
        $parsedJson = json_decode(file_get_contents(
            resource_path('geojson/bomen-zoetermeer.geojson')
        ), false, flags: JSON_THROW_ON_ERROR);

        foreach ($parsedJson->features as $feature) {
            Tree::insert([
                'id' => $feature->properties->BMN_ID,
                'geometry' => DB::raw(
                    "ST_GeomFromGeoJSON('" . json_encode($feature->geometry, JSON_THROW_ON_ERROR) . "'::json)"
                ),
                'properties' => json_encode($feature->properties, JSON_THROW_ON_ERROR),
            ]);
        }
    }
}
