<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\TreeFilterRequest;
use App\Http\Resources\TreeCollection;
use App\Http\Resources\TreeResource;
use App\Models\Tree;
use App\Services\MetaService;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(TreeFilterRequest $request): TreeCollection
    {
        $query = Tree::query()
            ->orderBy('properties->BMN_BOOMNUMMER');

        if ($request->filled('center')) {
            $latLng = $request->input('center');

            $query->orderByDistance($latLng['lng'], $latLng['lat']);
        }

        if ($request->filled('limit')) {
            $query->limit($request->input('limit'));
        }

        $filter = $request->safe()->filter ?? [];
        foreach ($filter as $ref => $value) {
            $key = MetaService::FILTER_COLUMN_MAPPING[$ref];
            $query->whereIn("properties->${key}", $value);
        }

        return new TreeCollection($query->cursor());
    }

    /**
     * Display the specified resource.
     */
    public function show(Tree $tree): TreeResource
    {
        return new TreeResource($tree);
    }
}
