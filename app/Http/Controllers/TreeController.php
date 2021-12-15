<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\TreeFilterRequest;
use App\Http\Resources\TreeCollection;
use App\Http\Resources\TreeResource;
use App\Models\Tree;

class TreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(TreeFilterRequest $request): TreeCollection
    {
        $query = Tree::query();

        if ($request->filled('center')) {
            $latLng = $request->input('center');

            $query->orderByDistance($latLng['lng'], $latLng['lat']);
        }

        if ($request->filled('limit')) {
            $query->limit($request->input('limit'));
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
