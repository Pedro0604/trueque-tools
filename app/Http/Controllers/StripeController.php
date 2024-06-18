<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use MercadoPago\MercadoPagoConfig;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Exception\UnexpectedValueException;
use Stripe\StripeClient;
use Stripe\Webhook;

class StripeController extends Controller
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));
    }

    public function promote(Product $product): RedirectResponse
    {
        Gate::authorize('promote', $product);

        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));

        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'ars',
                        'product_data' => [
                            'name' => 'Promoción del producto: "' . $product->name . '"',
                            'description' => $product->description,
                        ],
                        'unit_amount' => 1000 * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('promotion.success', $product->id, true),
            'cancel_url' => route('promotion.cancel', $product->id, true),
        ]);

        Transaction::create([
            'status' => 'pending',
            'price' => 1000,
            'session_id' => $checkout_session->id,
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'source' => 'stripe'
        ]);

        return redirect($checkout_session->url);
    }

    public function webhook(): Application|ResponseFactory|\Illuminate\Foundation\Application|Response
    {
        $endpoint_secret = env('STRIPE_WEBHOOK_KEY');
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (UnexpectedValueException|SignatureVerificationException $e) {
            return response('', 400);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $transaction = Transaction::where('session_id', $session->id)->first();
                $transaction->markAsPaid();
                break;
            case 'checkout.session.async_payment_failed':
                $session = $event->data->object;
                $transaction = Transaction::where('session_id', $session->id)->first();
                $transaction->markAsFailed();
                break;
            default:
                echo 'Received unknown event type' . $event->type;
        }

        return response('', 200);
    }
}
