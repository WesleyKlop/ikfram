<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTreeRequest;
use App\Http\Requests\UpdateTreeRequest;
use App\Http\Resources\TreeCollection;
use App\Http\Resources\TreeResource;
use App\Models\Tree;
use Illuminate\Support\Facades\DB;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): TreeCollection
    {
        $trees = Tree::query()
            ->orderBy('id')
            ->select(['id', 'properties', DB::raw('ST_AsGeoJSON(geometry) as geometry')])
            ->limit(50)
            ->get();
        return new TreeCollection($trees);
    }


    /**
     * Display the specified resource.
     */
    public function show(Tree $tree): TreeResource
    {
        return new TreeResource($tree);
    }
}
