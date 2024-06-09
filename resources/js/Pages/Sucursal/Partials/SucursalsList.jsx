import Sucursal from "@/Pages/Sucursal/Partials/Sucursal.jsx";

export default function SucursalsList({ sucursals,
                                         emptyListMessage = "No hay sucursales cargadas",
                                     }) {
    return (
        <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
            {sucursals.length > 0 ?
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    {sucursals.map(sucursal => (
                        <Sucursal
                            key={sucursal.id}
                            sucursal={sucursal}
                        />))}
                </div>
                : <>
                    <h3 className="text-center text-3xl font-bold">
                        {emptyListMessage}
                    </h3>
                    <h4 className="text-center text-2xl font-bold mt-6">
                        Cargá una sucursal ahora mismo haciendo click en el botón de arriba ⭡
                    </h4>
                </>
            }
        </div>
    )
}
