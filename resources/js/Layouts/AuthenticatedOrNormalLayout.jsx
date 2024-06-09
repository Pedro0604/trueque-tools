import NormalLayout from "@/Layouts/NormalLayout.jsx";
import {usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

// Es para las rutas que puedan ser accedidos tanto logueados como no logueados (productos.index, etc.)
// Solo aplica si la vista que se renderiza en children es la misma para ambos casos
// Si los usuarios autenticados van a poder ver una cosa que los normales no, entonces no se puede usar este layout
export default function AuthenticatedOrNormalLayout({header, children}) {
    const auth = usePage().props.auth
    if(auth.admin || auth.empleado || auth.user){
        return (
            <AuthenticatedLayout
                header={header}
            >
                {children}
            </AuthenticatedLayout>
        )
    }
    return (
        <NormalLayout
            header={header}
        >
            {children}
        </NormalLayout>
    )
}
