import {Head} from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import UsersList from "@/Pages/User/Partials/UsersList.jsx";

export default function Index({users}) {
    return (
        <AdminLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Usuarios
                    </h2>
                </div>
            }
        >
            <Head title="Usuarios"/>

            <UsersList
                users={users}
                emptyListMessage="No hay usuarios cargados en el sistema"
            />
        </AdminLayout>
    )
}
