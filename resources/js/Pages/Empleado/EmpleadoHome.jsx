import EmpleadoLayout from "@/Layouts/EmpleadoLayout.jsx";
import {Head} from "@inertiajs/react";

export default function EmpleadoHome() {
    return (
        <EmpleadoLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Empleado</h2>}
        >
            <Head title="Empleado home" />
        </EmpleadoLayout>
    );
}
