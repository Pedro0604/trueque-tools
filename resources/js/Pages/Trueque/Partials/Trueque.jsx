import Product from "@/Pages/Product/Partials/Product.jsx";
import BusinessIcon from "@mui/icons-material/Business";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import {Chip} from "@mui/material";
import {router} from "@inertiajs/react";

export default function Trueque({
                                    trueque,
                                    onClick = null,
                                    className = "",
                                    withCategory = false,
                                    withSucursal = false,
                                    showHoverOnProduct = false,
                                    showCursorPointer = true,
                                    ...props
                                }) {

    const showTrueque = (truequeId) => {
        //console.log("Mostrar trueque con id: " + truequeId);
        //console.error("DESCOMENTARRRRRR")
        router.get(route('trueque.show', truequeId));
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

    const productClass = `w-full border-none px-2 ${showHoverOnProduct ? 'lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl' : ''}`

    return (
        <div
            {...props}
            onClick={onClick ? onClick : () => showTrueque(trueque.id)}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                transition-all rounded-lg p-4 ${showCursorPointer ?  'cursor-pointer' : '' } border ${borderColor}
                 ${className}`}
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
                <div className="flex justify-center items-center gap-1 mt-1 text-gray-600 dark:text-custom-beige-300">
                    <BusinessIcon/>
                    <p className="text-sm sm:text-base lg:text-lg">
                        {trueque.solicitud.published_product.sucursal.name}
                    </p>
                </div>
                <p className="text-gray-600 dark:text-custom-beige-300 text-sm sm:text-base lg:text-lg">
                    CATEGORIA:
                    <span className="ml-1">{trueque.solicitud.published_product.category}</span>
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
                    />
                </div>
                <MultipleStopIcon sx={{fontSize: 40}}/>
                <div className="flex-1 flex justify-center">
                    <Product
                        product={trueque.solicitud.offered_product}
                        withCategory={withCategory}
                        withSucursal={withSucursal}
                        className={productClass}
                    />
                </div>
            </div>
        </div>
    )
}
