import Modal from "@mui/material/Modal";
import {usePage} from "@inertiajs/react";
import {initMercadoPago, Wallet} from "@mercadopago/sdk-react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import CreditCardIcon from "@mui/icons-material/CreditCard";

initMercadoPago("APP_USR-66c048b3-9b12-4fb2-8961-7cea14c5a0a4");

export default function PromotionModal({
                                           open,
                                           handleClose,
                                           productId,
                                           preferenceId,
                                       }) {
    const {csrf_token} = usePage().props;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex items-center justify-center"
        >
            <div className="flex flex-col gap-2 items-center bg-gray-600 pt-10 pb-2 px-10 rounded-lg max-w-lg">
                <h2
                    className="text-white text-xl text-center mb-2"
                >Promocioná el producto por una semana por el módico precio de $4999.99</h2>
                <form
                    action={route("promotion.stripe.promote", productId)}
                    method="POST"
                    className="w-full"
                >
                    <input
                        type="hidden"
                        name="_token"
                        value={csrf_token}
                        autoComplete="off"
                    />

                    <PrimaryButton className="w-full justify-center h-12 !text-sm">
                        Pagar con tarjeta <CreditCardIcon className="ml-2"/>
                    </PrimaryButton>
                </form>
                <div
                    className="w-full"
                >
                    <Wallet
                        initialization={{preferenceId: preferenceId}}
                        customization={{texts: {valueProp: "smart_option"}}}
                    />
                    <div id="wallet_container"></div>
                </div>
            </div>
        </Modal>
    );
}
