import {Head} from "@inertiajs/react";
import CreateForm from "@/Pages/Sucursal/Partials/CreateForm";
import AdminLayout from "@/Layouts/AdminLayout.jsx";

export default function Create() {

    return (
        <AdminLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Agregar una sucursal
                    </h2>
                </div>
            }
        >
            <Head title="Agregar Sucursal"/>
            <CreateForm />
        </AdminLayout>
    )
}
