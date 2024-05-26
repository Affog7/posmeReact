<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;

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
            $charge = Charge::create([
                'amount' => $request->amount * 100, // Amount in cents
                'currency' => 'usd',
                'source' => $request->payment_method,
                'description' => 'Payment description',
            ]);

            $payment = new Payment();
            $payment->user_id = auth()->id();
            $payment->amount = $request->amount;
            $payment->status = 'completed';
            $payment->payment_method = 'stripe';
            $payment->save();

            return response()->json(['success' => 1, 'message' => 'Payment succeed']);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Payment failed: ' . $e->getMessage()], 500);
        }

    }
}
