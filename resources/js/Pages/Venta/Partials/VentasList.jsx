import Venta from "@/Pages/Venta/Partials/Venta.jsx";

export default function VentasList({
                                       ventas,
                                       emptyListMessage = "No hay ventas realizados",
                                   }) {
    return (
        <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
            {ventas.length ?
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {ventas.map(venta => (
                        <Venta
                            venta={venta}
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
    )
}
