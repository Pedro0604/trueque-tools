import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import {router} from "@inertiajs/react";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";

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
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm text-gray-600 dark:text-gray-500">
                        {offered_product.user.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-500 ml-2">
                        {solicitud.created_at}
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-sm text-gray-600 dark:text-gray-500">
                        {offered_product.name}
                    </div>
                    <div
                        onClick={() => showProduct(offered_product.id)}
                        className="cursor-pointer"
                    >
                        {offered_product.image_path ?
                            <img
                                src={offered_product.image_path}
                                alt={offered_product.name}
                                className={`object-cover w-full aspect-square rounded-md  border border-custom-beige-900 dark:border-custom-beige-500`}
                            />
                            :
                            <div
                                className="flex items-center justify-center w-full aspect-square rounded-md bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                                <p className="hidden sm:inline">IMAGEN NO ENCONTRADA</p>
                                <span className="sm:hidden">
                                <ImageNotSupportedIcon
                                    sx={{fontSize: 32}}
                                />
                            </span>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
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
