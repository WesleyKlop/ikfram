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
            'center.*' => ['required_with:center', 'numeric'],
            'zoom' => ['nullable', 'int'],
            'limit' => ['nullable', 'int', 'min:1'],
        ];
    }
}
