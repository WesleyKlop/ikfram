<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Tree;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Tree */
class TreeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function toArray($request): array
    {
        return [
            'type' => 'Feature',
            'geometry' => $this->geometry,
            'properties' => $this->properties,
        ];
    }

    /**
     * Customize the outgoing response for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Response  $response
     */
    public function withResponse($request, $response): void
    {
        $response->header('Content-Type', 'application/geo+json');
    }
}
