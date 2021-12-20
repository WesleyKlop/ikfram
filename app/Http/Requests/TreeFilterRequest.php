<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TreeFilterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'center' => ['nullable', 'array'],
            'center.lat' => ['required_with:center', 'numeric'],
            'center.lng' => ['required_with:center', 'numeric'],

            'filter.neighbourhoods' => ['nullable', 'array', 'min:1'],
            'filter.neighbourhoods.*' => ['required_with:filter.neighbourhoods', 'string'],

            'filter.conditions' => ['nullable', 'array', 'min:1'],
            'filter.conditions.*' => ['required_with:filter.conditions', 'string'],

            'filter.years' => ['nullable', 'array', 'min:1'],
            'filter.years.*' => ['required_with:filter.years', 'string'],

            'filter.risks' => ['nullable', 'array', 'min:1'],
            'filter.risks.*' => ['required_with:filter.risks', 'string'],

            'filter.species' => ['nullable', 'array', 'min:1'],
            'filter.species.*' => ['required_with:filter.species', 'string'],

            'zoom' => ['nullable', 'int'],

            'limit' => ['nullable', 'int', 'min:1'],
        ];
    }
}
