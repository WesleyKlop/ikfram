<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Illuminate\Contracts\Support\Arrayable;

class Meta implements Arrayable, \JsonSerializable
{
    public function __construct(
        public readonly int $count,
        public readonly array $neighbourhoods,
        public readonly array $conditions,
        public readonly array $years,
        public readonly array $risks,
        public readonly array $species,
    ) {
    }

    public function toArray(): array
    {
        return [
            'count' => $this->count,
            'neighbourhoods' => $this->neighbourhoods,
            'conditions' => $this->conditions,
            'years' => $this->years,
            'risks' => $this->risks,
            'species' => $this->species,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
