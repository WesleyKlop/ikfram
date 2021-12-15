<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\Meta;
use App\Models\Tree;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MetaService
{
    public function getMeta(): Meta
    {
        return Cache::rememberForever('meta', fn (): Meta => $this->fetchMeta());
    }

    protected function fetchMeta(): Meta
    {
        $data = [
            'count' => Tree::query()->withoutGlobalScopes()->count(),
        ];
        $filters = [
            'neighbourhood' => 'BMN_WIJK',
            'condition' => 'BMN_CONDITIE',
            'year' => 'BMN_PLANTJAAR',
            'risk' => 'BMN_RISICOKLASSE',
            'species' => 'BMN_BOOMSOORT_LAT',
        ];

        foreach ($filters as $key => $filter) {
            $data[$key] = Tree::query()
                ->withoutGlobalScope('geojson')
                ->select("properties->${filter} AS label", DB::raw('count(*) AS count'))
                ->groupBy('label')
                ->orderByDesc('count')
                ->get()
                ->toArray();
        }

        return new Meta(
            $data['count'],
            $data['neighbourhood'],
            $data['condition'],
            $data['year'],
            $data['risk'],
            $data['species']
        );
    }
}
