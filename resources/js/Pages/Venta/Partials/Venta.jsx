import BusinessIcon from "@mui/icons-material/Business";
import {Chip} from "@mui/material";
import IconWithText from "@/Components/IconWithText.jsx";
import ProductoVenta from "@/Pages/Venta/Partials/ProductoVenta.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import Divisor from "@/Components/Divisor.jsx";

export default function Venta({
                                  venta,
                                  showReduced = false,
                                  className = "",
                                  ...props
                              }) {
    return (
        <div
            {...props}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
            transition-all rounded-lg p-4 border border-custom-beige-700 dark:border-custom-beige-400
            flex flex-col justify-between ${className}`}
        >
            <div>
                <div
                    className="flex flex-col justify-center items-center gap-0.5 mb-2"
                >
                    <h2 className="text-2xl text-center">
                        {venta.created_at}
                    </h2>
                    <IconWithText
                        icon={<BusinessIcon/>}
                        text={venta.trueque.solicitud.published_product.sucursal.name}
                        textSize={"text-sm sm:text-base lg:text-lg"}
                    />
                    <Chip
                        label={`$${venta.total}`}
                        sx={{
                            color: 'white',
                            fontSize: '1rem',
                        }}
                        color="primary"
                    />
                </div>
                <Divisor
                    className="my-3"
                />
                <div className={`flex flex-col gap-4 mb-6 px-4`}>
                    {venta.products.map((productoVenta) => {
                        return (
                            <ProductoVenta
                                productoVenta={productoVenta}
                                key={productoVenta.id}
                            />
                        )
                    })}
                </div>
            </div>
            <CyanButton
                isLink
                href={route('trueque.show', venta.trueque.id)}
                className="justify-center"
            >
                Ver trueque
            </CyanButton>
        </div>
    )
}
