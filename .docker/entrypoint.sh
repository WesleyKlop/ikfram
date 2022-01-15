#!/usr/bin/env bash
set -e

if [ -f .env ]; then
    source .env
fi

if [ -z "$APP_KEY" ]; then
    echo "No application key found, setting and then exiting. Please start again."
    php artisan key:generate
    exit 1
fi

mkdir -p \
  storage/logs \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  storage/app/public
chown -R www-data:www-data /app/storage

su www-data -s /bin/bash -c '
php artisan migrate --force --seed
php artisan optimize
'

exec docker-php-entrypoint "$@"
