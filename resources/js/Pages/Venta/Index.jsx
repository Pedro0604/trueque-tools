import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import VentasList from "@/Pages/Venta/Partials/VentasList.jsx";

export default function Index({ventas}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Ventas
                    </h2>
                </div>
            }
        >
            <Head title="Ventas"/>

            <VentasList
                ventas={ventas}
                emptyListMessage={"No hay trueques realizados"}
            />
        </AuthenticatedLayout>
    )
}
