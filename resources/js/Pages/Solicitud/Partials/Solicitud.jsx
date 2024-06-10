import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import {router} from "@inertiajs/react";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";
import Product from "@/Pages/Product/Partials/Product.jsx";
import Divisor from "@/Components/Divisor.jsx";
import {Chip} from "@mui/material";
import MultipleStopIcon from "@mui/icons-material/MultipleStop.js";

export default function Solicitud({
                                      solicitud,
                                      showBothProducts = false,
                                      redirectOnReject = route('product.show', solicitud.published_product.id),
                                      showHoverOnProduct = false,
                                  }) {
    const {offered_product, published_product} = solicitud;

    const showProduct = (productId) => {
        router.get(route('product.show', productId));
    }

    const acceptSolicitud = (solicitudId) => {
        router.post(route('solicitud.accept', [published_product.id, solicitudId]), {solicitud_id: solicitudId})
    }

    const rejectSolicitud = (solicitudId) => {
        router.post(route('solicitud.reject', [published_product.id, solicitudId]), {
            solicitud_id: solicitudId,
            redirectOnReject: redirectOnReject
        })
    }

    let borderColor = 'border-custom-blue-700 dark:border-custom-blue-400';
    let chipText = "Pendiente"
    let chipColor = 'primary'
    if (solicitud.wasRejected) {
        borderColor = 'border-red-600 dark:border-red-500';
        chipText = "Rechazada"
        chipColor = 'error'
    }
    if (solicitud.wasAccepted) {
        borderColor = 'border-green-600 dark:border-green-500';
        chipText = "Aceptada"
        chipColor = 'success'
    }
    if (solicitud.isPaused) {
        borderColor = 'border-yellow-600 dark:border-yellow-500';
        chipText = "Pausada"
        chipColor = 'warning'
    }

    const productClass = `w-full border-none ${showBothProducts ? 'px-2' : 'px-0'} ${showHoverOnProduct ? 'lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl' : ''}`

    return (
        <div
            className={`text-black dark:text-white border rounded-md p-4 relative ${borderColor}`}
        >
            <div>
                <div className="text-2xl text-center text-gray-800 dark:text-gray-300 ml-2">
                    Fecha propuesta
                    <div
                        className="text-lg text-gray-800 dark:text-gray-300"
                    >
                        {solicitud.meeting_date_time}
                    </div>
                    <Chip
                        label={chipText}
                        sx={{
                            color: 'white'
                        }}
                        color={chipColor}
                    />
                </div>
                <div className={`flex items-center gap-4 ${showBothProducts ? 'mt-4' : ''}`}>
                    {showBothProducts &&
                        <>
                            <div className="flex-1 flex justify-center">
                                <Product
                                    product={published_product}
                                    onClick={() => showProduct(published_product.id)}
                                    className={productClass}
                                    withCategory={false}
                                    withSucursal={false}
                                />
                            </div>
                            <MultipleStopIcon sx={{fontSize: 40}}/>
                        </>
                    }
                    <div className="flex-1 flex justify-center">
                        <Product
                            product={offered_product}
                            onClick={() => showProduct(offered_product.id)}
                            className={productClass}
                            withCategory={false}
                            withSucursal={false}
                        />
                    </div>
                </div>
                {!solicitud.onlyView &&
                    <div
                        className={`${showBothProducts ? 'mt-4' : ''}`}
                    >
                        <Divisor className=""/>
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
                }
            </div>
        </div>
    )
}
