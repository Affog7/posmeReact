<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="shorcut icon" href="{{ asset('img/favicon.png') }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <title>Actiry POS-CAISSE</title>
    </head>
    <body>
        <div id="payments"></div>
        <script src="{{ asset('js/payments.js') }}"></script>
    </body>
</html>
