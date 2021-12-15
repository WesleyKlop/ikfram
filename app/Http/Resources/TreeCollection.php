<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class TreeCollection extends ResourceCollection
{
    public static $wrap = null;

    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     */
    public function toArray($request): array
    {
        return [
            'type' => 'FeatureCollection',
            'name' => 'Bomen',
            'crs' => [
                'type' => 'name',
                'properties' => [
                    'name' => 'urn:ogc:def:crs:OGC:1.3:CRS84',
                ],
            ],
            'features' => $this->collection,
        ];
    }

    /**
     * Customize the outgoing response for the resource.
     *
     * @param Request $request
     * @param Response $response
     */
    public function withResponse($request, $response): void
    {
        $response->header('Content-Type', 'application/geo+json');
    }
}
