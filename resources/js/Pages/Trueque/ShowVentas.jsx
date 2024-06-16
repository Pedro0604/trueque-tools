import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import VentasList from "@/Pages/Venta/Partials/VentasList.jsx";

export default function ShowVentas({ventas}){
    return(
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Ventas del trueque {`"${ventas[0].trueque.solicitud.published_product.user.name}" - "${ventas[0].trueque.solicitud.offered_product.user.name}"`}
                    </h2>
                </div>
            }
        >
            <Head title={`Ventas del trueque "${ventas[0].trueque.solicitud.published_product.user.name}" - "${ventas[0].trueque.solicitud.offered_product.user.name}`}/>

            <VentasList
                ventas={ventas}
                emptyListMessage={"No hay ventas realizados"}
                showReduced
            />
        </AuthenticatedLayout>
    )
}
