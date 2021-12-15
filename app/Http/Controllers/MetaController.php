<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\MetaService;
use Illuminate\Http\JsonResponse;

class MetaController extends Controller
{
    public function __construct(
        private readonly MetaService $metaService
    ) {
    }

    public function __invoke(): JsonResponse
    {
        $meta = $this->metaService->getMeta();

        return response()->json($meta);
    }
}
