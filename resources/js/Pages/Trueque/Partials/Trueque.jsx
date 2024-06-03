import Product from "@/Pages/Product/Partials/Product.jsx";
import BusinessIcon from "@mui/icons-material/Business.js";
import MultipleStopIcon from "@mui/icons-material/MultipleStop.js";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";

export default function Trueque({trueque, onClick = null, className = "", ...props}) {

    const showTrueque = (truequeId) => {
        console.log("Mostrar trueque con id: " + truequeId);
        console.error("DESCOMENTARRRRRR")
        // router.get(route('trueque.show', truequeId));
    }

    return (
        <div
            {...props}
            onClick={onClick ? onClick : () => showTrueque(trueque.id)}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl transition-all
                rounded-lg p-4 cursor-pointer border border-custom-beige-900 dark:border-custom-beige-500
                flex gap-4 ${className}`}
        >
            <Product
                product={trueque.solicitud.published_product}
                withCategory={false}
                withSucursal={false}
            />
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-custom-beige-300">
                    <BusinessIcon sx={{fontSize: 32}}/>
                    <p className="text-sm sm:text-base lg:text-xl">
                        {trueque.solicitud.published_product.sucursal.name}
                    </p>
                </div>
                <div className="">
                    <MultipleStopIcon sx={{fontSize: 40}}/>
                </div>
                <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-custom-beige-300">
                    <BusinessIcon sx={{fontSize: 32}}/>
                    <p className="text-sm sm:text-base lg:text-xl">
                            CATEGORIA PONER SIMBOLO PESOS Y NOMBRE
                        {trueque.solicitud.published_product.category}
                    </p>
                </div>
            </div>
            <Product
                withCategory={false}
                withSucursal={false}
                product={trueque.solicitud.offered_product}
            />
        </div>
    )
}
