<?php

declare(strict_types=1);

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

    public function scopeOrderByDistance(Builder $query, float $lat, float $lng): Builder
    {
        return $query->orderByRaw("ST_MakePoint({$lng}, {$lat}) <-> geometry");
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('geojson', function (Builder $builder) {
            $builder->addSelect([
                'id',
                'properties',
                'geometry' => DB::raw('ST_AsGeoJSON(geometry) as geometry'),
            ]);
        });
    }
}
