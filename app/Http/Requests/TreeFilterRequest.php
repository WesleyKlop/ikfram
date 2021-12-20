<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\MetaService;
use Illuminate\Foundation\Http\FormRequest;

class TreeFilterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $base = [
            'center' => ['nullable', 'array'],
            'center.lat' => ['required_with:center', 'numeric'],
            'center.lng' => ['required_with:center', 'numeric'],

            'zoom' => ['nullable', 'int'],

            'limit' => ['nullable', 'int', 'min:1'],
        ];

        foreach (array_keys(MetaService::FILTER_COLUMN_MAPPING) as $filter) {
            $base['filter.' . $filter] = ['nullable', 'array', 'min:1'];
            $base['filter.' . $filter . '.*'] = ['required_with:filter.' . $filter, 'string'];
        }

        return $base;
    }
}
