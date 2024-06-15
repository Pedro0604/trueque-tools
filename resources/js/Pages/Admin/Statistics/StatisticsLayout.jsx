import AdminLayout from "@/Layouts/AdminLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
import {Head} from "@inertiajs/react";

export default function StatisticsLayout({children}) {
    return (
        <AdminLayout
            header={
                <nav
                    className="bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route('admin.statistics.mostTrueques')}
                                active={route().current('admin.statistics.mostTrueques')}
                                className="px-3 pt-2 pb-2"
                            >
                                Usuarios con más trueques
                            </NavLink>
                            <NavLink
                                href={route('admin.empleado.index')}
                                active={route().current('admin.empleado.index')}
                                className="px-3 pt-2 pb-2"
                            >
                                Trueques entre fechas
                            </NavLink>
                            <NavLink
                                href={route('admin.statistics.mostTrueques')}
                                active={route().current('admin.statistics.mostTrueques')}
                                className="px-3 pt-2 pb-2"
                            >
                                Ventas entre fechas
                            </NavLink>
                        </div>
                    </div>
                </nav>
            }
        >
            <Head title="Estadísticas"/>

            {children}
        </AdminLayout>
    )
}
