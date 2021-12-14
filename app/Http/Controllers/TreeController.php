<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\TreeCollection;
use App\Http\Resources\TreeResource;
use App\Models\Tree;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): TreeCollection
    {
        $trees = Tree::query()
            ->limit(50)
            ->cursor();
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
