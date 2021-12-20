<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Tree;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MetaService
{
    final public const FILTER_COLUMN_MAPPING = [
        'neighbourhoods' => 'BMN_WIJK',
        'conditions' => 'BMN_CONDITIE',
        'years' => 'BMN_PLANTJAAR',
        'risks' => 'BMN_RISICOKLASSE',
        'species' => 'BMN_BOOMSOORT_LAT',
        'genus' => 'BMN_LAT_KORT',
        'ground' => 'BMN_STANDPLAATS',
        'height' => 'BMN_BHR_BOOMHOOGTE',
        'maintainer' => 'BMN_ONDERHOUDSPLICHTIGE',
        'special-status' => 'BMN_BLD_BIJZONDERE_STATUS',
        'growth-rate' => 'BMN_GROEISNELHEID',
    ];

    public function getMeta(): array
    {
        return Cache::remember('meta', 60, fn () => $this->fetchMeta());
    }

    protected function fetchMeta(): array
    {
        $data = [
            'count' => Tree::query()->withoutGlobalScopes()->count(),
        ];

        foreach (self::FILTER_COLUMN_MAPPING as $key => $filter) {
            $data[$key] = Tree::query()
                ->withoutGlobalScope('geojson')
                ->select("properties->${filter} AS label", DB::raw('count(*) AS count'))
                ->groupBy('label')
                ->get()
                ->toArray();
        }

        return $data;
    }
}
