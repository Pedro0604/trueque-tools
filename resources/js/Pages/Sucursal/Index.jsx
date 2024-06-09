import {Head, usePage} from "@inertiajs/react";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import SucursalsList from "@/Pages/Sucursal/Partials/SucursalsList.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";

export default function Index({sucursals}) {
    const auth = usePage().props.auth;
    return (
        <AuthenticatedOrNormalLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Sucursales
                    </h2>
                    {auth.admin &&
                    <CyanButton
                        isLink
                        href={route('admin.sucursal.create')}
                    >
                        <span className="hidden sm:block">Agregar nueva sucursal</span>
                        <span className="sm:hidden"><AddIcon/></span>
                    </CyanButton>
                }
                </div>
            }
        >

            <Head title="Sucursales"/>
            <SucursalsList
                sucursals={sucursals}
                emptyListMessage="No hay sucursales cargadas en el sistema"
            />
        </AuthenticatedOrNormalLayout>
    )
}
