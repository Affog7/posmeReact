<?php

namespace App\Listeners;

use App\Events\PaymentCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Mail\ClientMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendPaymentReceipt
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\PaymentCreated  $event
     * @return void
     */
    public function handle(PaymentCreated $event)
    {
        // Préparer les détails pour l'email
        $details = [
            'title' => 'Receipt for Your Payment',
            'body' => 'Thank you for your payment of $' . $event->payment->amount . '.'
        ];

       // Log::info($event->payment->user);
        // Envoyer l'email
       // Mail::to($event->payment->user->email)->send(new ClientMail($details));
    }
}
