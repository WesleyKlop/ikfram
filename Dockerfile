FROM node:17 as front-builder
WORKDIR /app

# Copy package manager files as a first step for good caching
COPY package.json package-lock.json ./
RUN npm ci

COPY webpack.mix.js tailwind.config.js artisan ./

COPY resources ./resources
RUN npm run production

FROM composer:2 as back-builder
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --ignore-platform-reqs \
    --no-ansi \
    --no-autoloader \
    --no-dev \
    --no-interaction \
    --no-scripts

COPY . /app
RUN composer dump-autoload -a

# Build app image
FROM php:8.1-apache

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions opcache pgsql pdo_pgsql bcmath intl

RUN a2enmod rewrite

COPY .docker/apache.conf /etc/apache2/sites-available/000-default.conf
COPY .docker/entrypoint.sh /usr/local/bin/entrypoint.sh

WORKDIR /app
COPY --chown=www-data:www-data --from=back-builder /app/ /app
COPY --chown=www-data:www-data --from=front-builder /app/public/ /app/public

VOLUME /app/storage/logs
VOLUME /app/storage/app

RUN mkdir -p \
     /app/storage/app/public \
     /app/storage/framework/cache/data \
     /app/storage/framework/sessions \
     /app/storage/framework/testing \
     /app/storage/framework/views \
 && chown -R www-data:www-data /app/storage

ENTRYPOINT ["entrypoint.sh"]
CMD ["apache2-foreground"]
