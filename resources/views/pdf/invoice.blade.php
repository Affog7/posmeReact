<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('img/favicon.png') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Actiry POS-CAISSE</title>
    <style>
        .a4-div {
            width: 18cm; /* Largeur de la page A4 en centimètres */
            height: 29.7cm; /* Hauteur de la page A4 en centimètres */
            background-color: #f0f0f0; /* Couleur de fond pour visualiser la zone */
            margin: 0 auto; /* Pour centrer le div horizontalement */
         }
    </style>
</head>
<body>
    <div class="text-left w-full text-sm p-6 overflow-auto a4-div">
        <div class="text-center">
            <img src="img/logo.png" class="w-10 m-auto filter grayscale" alt="Logo">
            <h2 class="text-xl font-semibold">ACTIRY POS</h2>
            <p>AUGAFF SHOP</p>
        </div>
        <div class="flex mt-4 text-xs">
            <div class="flex-grow">
                No : <span>{{ $receipt->receipt_number }} - </span>
                {{ $receipt->is_paid ? " PAIEMENT FAIT " : " PAIEMENT NON FAIT " }}
            </div>
            <div></div>
        </div>
        <hr class="my-2">
        <div>
            <table class="w-full text-xs">
                <thead>
                    <tr>
                        <th class="py-1 w-1/12 text-center">#</th>
                        <th class="py-1 text-left">Item</th>
                        <th class="py-1 w-2/12 text-center">Qty</th>
                        <th class="py-1 w-3/12 text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($receipt->products as $index => $item)
                        <tr>
                            <td class="py-2 text-center">{{ $index+1 }}</td>
                            <td class="py-2 text-left">
                                <span>{{ $item->product->name }}</span>
                                <br>
                                <small>{{  ($item->price) }}</small>
                            </td>
                            <td class="py-2 text-center">{{ $item->quantity }}</td>
                            <td class="py-2 text-right">{{ ($item->quantity*$item->price) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <hr class="my-2">
        <div>
            <div class="flex font-semibold">
                <span class="flex-grow">TOTAL</span>
                <span>{{ ($receipt->total_amount) }}</span>
            </div>
            <div class="flex text-xs font-semibold">
                <span class="flex-grow">PAY AMOUNT</span>
                <span>{{ ($receipt->cash) }}</span>
            </div>
            <hr class="my-2">
            <div class="flex text-xs font-semibold">
                <span class="flex-grow">CHANGE</span>
                <span>{{ ($receipt->change) }}</span>
            </div>
        </div>
    </div>

    <script>
          window.addEventListener('load', function() {
            // Appel automatique de la fonction pour imprimer la page
            printPage();
        });
        // Fonction pour imprimer la page
        function printPage() {
            window.print();
        }
    </script>   
</body>
</html>
