import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import {router} from "@inertiajs/react";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";
import Product from "@/Pages/Product/Partials/Product.jsx";
import Divisor from "@/Components/Divisor.jsx";

export default function Solicitud({solicitud}) {
    const {offered_product, published_product} = solicitud;

    const showProduct = (productId) => {
        router.get(route('product.show', productId));
    }

    const acceptSolicitud = (solicitudId) => {
        router.post(route('solicitud.accept', [published_product.id, solicitudId]), {solicitud_id: solicitudId})
    }

    const rejectSolicitud = (solicitudId) => {
        router.post(route('solicitud.reject', [published_product.id, solicitudId]), {solicitud_id: solicitudId})
    }

    return (
        <div
            className={`text-black dark:text-white border border-custom-cyan-800 dark:border-custom-cyan-400 rounded-md p-4 relative`}
        >
            <div>
                <div className="text-2xl text-center text-gray-800 dark:text-gray-300 ml-2">
                    Fecha propuesta
                    <div
                        className="text-lg text-gray-800 dark:text-gray-300"
                    >
                        {solicitud.meeting_date_time}
                    </div>
                </div>
                <div>
                    <Product
                        product={offered_product}
                        onClick={() => showProduct(offered_product.id)}
                        className="border-none px-0"
                        withCategory={false}
                        withSucursal={false}
                    />
                    <Divisor/>
                    <div className="flex flex-col gap-2 mt-6">
                        <CyanButton
                            className="w-full justify-center"
                            onClick={() => acceptSolicitud(solicitud.id)}
                        >
                            Aceptar
                        </CyanButton>
                        <DangerButton
                            className="w-full justify-center"
                            onClick={() => rejectSolicitud(solicitud.id)}
                        >
                            Rechazar
                        </DangerButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
