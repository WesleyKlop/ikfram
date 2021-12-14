<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tree extends Model
{
    use HasFactory;

    protected $casts = [
        'properties' => 'object',
        'geometry' => 'object',
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('geojson', function (Builder $builder) {
            $builder->addSelect([
                'properties',
                'geometry' => DB::raw('ST_AsGeoJSON(geometry) as geometry'),
            ]);
        });
    }
}
