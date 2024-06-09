import {Head} from "@inertiajs/react";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import AddIcon from "@mui/icons-material/Add";
import EmpleadosList from "@/Pages/Empleado/Partials/EmpleadosList.jsx";
import AdminLayout from "@/Layouts/AdminLayout.jsx";

export default function Index({empleados}) {
    return (
        <AdminLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Empleados
                    </h2>
                    <CyanButton
                        isLink
                        href={route('admin.empleado.create')}
                    >
                        <span className="hidden sm:block">Agregar nuevo Empleado</span>
                        <span className="sm:hidden"><AddIcon/></span>
                    </CyanButton>
                </div>
            }
        >
            <Head title="Productos"/>

            <EmpleadosList
                empleados={empleados}
                emptyListMessage="No hay empleados cargados en el sistema"
            />
        </AdminLayout>
    )
}
