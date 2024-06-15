import Product from "@/Pages/Product/Partials/Product.jsx";
import BusinessIcon from "@mui/icons-material/Business";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import {Chip} from "@mui/material";
import {router, usePage} from "@inertiajs/react";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import IconWithText from "@/Components/IconWithText.jsx";
import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";

export default function Trueque({
                                    trueque,
                                    onClick = null,
                                    className = "",
                                    withCategory = false,
                                    withSucursal = false,
                                    showHover = true,
                                    showHoverOnProduct = false,
                                    showCursorPointer = true,
                                    showActionButtons = false,
                                    ...props
                                }) {

    const auth = usePage().props.auth;

    const showTrueque = (truequeId) => {
        //console.log("Mostrar trueque con id: " + truequeId);
        //console.error("DESCOMENTARRRRRR")
        router.get(route('trueque.show', truequeId));
    }

    const cancelTrueque = (truequeId) => {
        router.post(route('trueque.cancel', [truequeId]))
    }

    const endTrueque = (truequeId) => {
        router.post(route('trueque.end', [truequeId]))
    }

    let borderColor = 'border-custom-blue-700 dark:border-custom-blue-400';
    let chipText = "Pendiente"
    let chipColor = 'primary'
    if (trueque.failed) {
        borderColor = 'border-red-600 dark:border-red-500';
        chipText = "Fallido"
        chipColor = 'error'
    }
    if (trueque.successful) {
        borderColor = 'border-green-600 dark:border-green-500';
        chipText = "Exitoso"
        chipColor = 'success'
    }
    const hoverClasses = 'lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl'

    const productClass = `w-full border-none px-2 ${showHoverOnProduct ? hoverClasses : ''}`

    return (
        <div
            {...props}
            onClick={onClick ? onClick : () => showTrueque(trueque.id)}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                transition-all rounded-lg p-4 ${showCursorPointer ? 'cursor-pointer' : ''} border ${borderColor}
                 ${showHover ? hoverClasses : ''} ${className}`}
        >
            <div
                className="flex flex-col justify-center items-center gap-0.5 mb-2"
            >
                <h2 className="text-2xl text-center">
                    {trueque.ended_at ?
                        ("Trocado el: " + trueque.ended_at) :
                        ("Fecha del trueque: " + trueque.solicitud.meeting_date_time)
                    }
                </h2>
                <IconWithText
                    icon={<BusinessIcon/>}
                    text={trueque.solicitud.published_product.sucursal.name}
                    textSize={"text-sm sm:text-base lg:text-lg"}
                />
                <p className="text-gray-600 dark:text-custom-beige-300 text-sm sm:text-base lg:text-lg mb-2">
                    {CATEGORIES_TEXT_MAP[trueque.solicitud.published_product.category]}
                </p>
                <Chip
                    label={chipText}
                    sx={{
                        color: 'white'
                    }}
                    color={chipColor}
                />
                <Chip
                    className="mt-2"
                    label={`Código del trueque: ${trueque.code}`}
                    sx={{
                        color: 'white'
                    }}
                    color='warning'
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="flex-1 flex justify-center">
                    <Product
                        product={trueque.solicitud.published_product}
                        withCategory={withCategory}
                        withSucursal={withSucursal}
                        className={productClass}
                        error={trueque.published_error}
                    />
                </div>
                <MultipleStopIcon sx={{fontSize: 40}}/>
                <div className="flex-1 flex justify-center">
                    <Product
                        product={trueque.solicitud.offered_product}
                        withCategory={withCategory}
                        withSucursal={withSucursal}
                        className={productClass}
                        error={trueque.offered_error}
                    />
                </div>
            </div>
            {showActionButtons &&
                <div
                    className="flex flex-col gap-4 mt-6"
                >
                    {trueque.can.cancel &&
                        <DangerButton
                            className="w-full justify-center"
                            onClick={() => cancelTrueque(trueque.id)}
                        >
                            Cancelar
                        </DangerButton>
                    }
                    {(auth.admin || auth.empleado) && trueque.can.fail &&
                        <DangerButton
                            className="w-full justify-center"
                            isLink
                            href={route('trueque.failForm', trueque.id)}
                        >
                            Informar fallo en un trueque
                        </DangerButton>
                    }
                    {(auth.admin || auth.empleado) && trueque.can.end &&
                        <CyanButton
                            className="w-full justify-center"
                            onClick={() => endTrueque(trueque.id)}
                        >
                            Finalizar Trueque
                        </CyanButton>
                    }
                </div>
            }
        </div>
    )
}
