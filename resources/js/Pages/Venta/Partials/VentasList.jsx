import Venta from "@/Pages/Venta/Partials/Venta.jsx";

export default function VentasList({
                                       ventas,
                                       emptyListMessage = "No hay ventas realizadas",
                                       showReduced = false
                                   }) {
    const classes = showReduced ? "flex" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"

    return (
        <div
            className="flex justify-center"
        >
            <div
                className={`text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg w-full ${showReduced ? 'max-w-[1000px]' : ''}`}>
                {ventas.length ?
                    <div
                        className={`${classes} gap-8`}>
                        {ventas.map(venta => (
                            <Venta
                                venta={venta}
                                showReduced={showReduced}
                                className={showReduced ? "w-full" : ""}
                                key={venta.id}
                            />))}
                    </div>
                    : <>
                        <h3 className="text-center text-3xl font-bold">
                            {emptyListMessage}
                        </h3>
                    </>
                }
            </div>
        </div>
    )
}
