import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NormalLayout from "@/Layouts/NormalLayout.jsx";

// Es para las rutas que puedan ser accedidos tanto logueados como no logueados (productos.index, etc.)
// Solo aplica si la vista que se renderiza en children es la misma para ambos casos
// Si los usuarios autenticados van a poder ver una cosa que los normales no, entonces no se puede usar este layout
export default function AuthenticatedOrNormalLayout({user, authenticatedHeader, normalHeader, children}) {
    const innerContainer = (
        <div className="p-6 sm:p-8 md:p-12">
            <div className="text-black dark:text-white bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
                {children}
            </div>
        </div>
    )

    if (user) {
        return (
            <AuthenticatedLayout
                user={user}
                header={authenticatedHeader}
            >
                {innerContainer}
            </AuthenticatedLayout>
        )
    }
    return (
        <NormalLayout header={normalHeader}>
            {innerContainer}
        </NormalLayout>
    )
}
