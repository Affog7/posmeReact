<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Payment;
use App\Events\PaymentCreated;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        Stripe::setApiKey(env('STRIPE_SECRET'));

        
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100, // Amount in cents
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);

            
            $payment = new Payment();
            $payment->user_id = auth()->id();
            $payment->amount = $request->amount;
            $payment->status = 'completed';
            $payment->ref_payment = $paymentIntent->client_secret;
            $payment->payment_method = 'stripe';
            $payment->save();

             // Déclencher l'événement
             event(new PaymentCreated($payment));

            return response()->json(['success' => 1, 'message' => 'Payment succeed','clientSecret' => $paymentIntent->client_secret]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Payment failed: ' . $e->getMessage()], 500);
        }

    }
}
