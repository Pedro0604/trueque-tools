<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoController extends Controller
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));
    }

    public function createPreference(Product $product): RedirectResponse
    {
        $client = new PreferenceClient();

        $external_reference = uniqid();

        $preference = $client->create([
            "external_reference" => $external_reference,
            "back_urls" => array(
                "success" => route('promotion.success', $product->id, true),
                "failure" => route('promotion.cancel', $product->id, true),
            ),
            "items" => array(
                array(
                    "id" => $product->id,
                    "title" => 'Promoción del producto: ' .$product->name,
                    "description" => $product->description,
                    "category_id" => "others",
                    "quantity" => 1,
                    "currency_id" => "ARS",
                    "unit_price" => 1000
                )
            ),
            "payment_methods" => array(
                "excluded_payment_types" => array(
                    array("id" => "ticket"),
                    array("id" => "debit_card"),
                    array("id" => "credit_card"),
                ),
                "installments" => 12,
            ),
        ]);

        Transaction::create([
            'status' => 'pending',
            'price' => 1000,
            'session_id' => $external_reference,
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'source' => 'mercadopago'
        ]);

        return to_route('product.show', $product->id)
            ->with('preference_id', $preference->id);
    }

    public function webhook(Request $request): JsonResponse
    {
        $data = $request->all();

        switch ($data["type"]) {
            case "payment":
                MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));
                Log::info('Payment webhook received');

                $payment_id = $data['data']['id'];
                $client = new PaymentClient();
                $payment = $client->get($payment_id);
                Log::info('Payment:', (array)$payment);

                $transaction = Transaction::where('session_id', $payment->external_reference)->first();

                if ($payment->status === 'approved') {
                    $transaction->markAsPaid();
                } else {
                    $transaction->markAsFailed();
                }
                break;
            default:
                Log::warning('Tipo de webhook no manejado:', $data["type"]);
                return response()->json(['status' => 'not handled'], 200);
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
