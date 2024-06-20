import Empleado from "@/Pages/Empleado/Partials/Empleado.jsx";

export default function EmpleadosList({
    empleados,
    emptyListMessage = "No hay empleados cargados",
}) {
    return (
        <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
            {empleados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-6">
                    {empleados.map((empleado) => (
                        <Empleado key={empleado.id} empleado={empleado} />
                    ))}
                </div>
            ) : (
                <>
                    <h3 className="text-center text-3xl font-bold">
                        {emptyListMessage}
                    </h3>
                    <h4 className="text-center text-2xl font-bold mt-6">
                        Cargá un empleado ahora mismo haciendo click en el botón
                        de arriba ⭡
                    </h4>
                </>
            )}
        </div>
    );
}
