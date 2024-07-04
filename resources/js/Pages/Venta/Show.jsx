import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Venta from "@/Pages/Venta/Partials/Venta.jsx";

export default function Show({venta}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Detalle de venta
                    </h2>
                </div>
            }
        >
            <Head title="Detalle de venta"/>
            <div
                className="mx-auto max-w-xl dark:text-white"
            >
                <Venta
                    venta={venta}
                />
            </div>
        </AuthenticatedLayout>
    );
}
