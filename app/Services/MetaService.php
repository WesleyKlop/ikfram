<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\Meta;
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
    ];

    public function getMeta(): Meta
    {
        return Cache::remember('meta', 60, fn (): Meta => $this->fetchMeta());
    }

    protected function fetchMeta(): Meta
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

        return new Meta(
            $data['count'],
            $data['neighbourhoods'],
            $data['conditions'],
            $data['years'],
            $data['risks'],
            $data['species']
        );
    }
}
