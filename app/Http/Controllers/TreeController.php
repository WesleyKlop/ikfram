<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\TreeCollection;
use App\Http\Resources\TreeResource;
use App\Models\Tree;
use Illuminate\Http\Request;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): TreeCollection
    {
        $trees = Tree::query()->limit(250);

        if ($request->filled('center')) {
            $latLng = $request->input('center');

            $trees->orderByRaw("ST_MakePoint({$latLng['lng']}, {$latLng['lat']}) <-> geometry");
        }

        return new TreeCollection($trees->cursor());
    }

    /**
     * Display the specified resource.
     */
    public function show(Tree $tree): TreeResource
    {
        return new TreeResource($tree);
    }
}
