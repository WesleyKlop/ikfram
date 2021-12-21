<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Boompj3x</title>

    <script>
    window.__APP_CONFIG = {
        mapsKey: '{{ config('maps.key') }}',
    }
    </script>

    <script defer src="{{ mix('assets/app.js') }}"></script>
</head>
<body class="antialiased">
<div id="app"></div>
</body>
</html>
