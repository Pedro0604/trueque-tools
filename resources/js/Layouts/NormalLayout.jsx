import {Link} from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import NavLink from "@/Components/NavLink.jsx";
import CommonLayout from "@/Layouts/CommonLayout.jsx";

export default function NormalLayout({header, children}) {
    {/* TODO - NO OLVIDARSE DE AGREGAR LOS LINKS EN navLinks y responsiveNavLinks */}
    return (
        <CommonLayout
            header={header}
            navLinks={
                <NavLink href={route('product.index')} active={route().current('product.index')}>
                    Productos
                </NavLink>
            }
            responsiveNavLinks={
                <ResponsiveNavLink href={route('product.index')} active={route().current('product.index')}>
                    Productos
                </ResponsiveNavLink>
            }
            headerOptions={
                <>
                    <Link
                        href={route('login')}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent
                        transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]
                        dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent
                        transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]
                        dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Registrarse
                    </Link>
                </>
            }
            responsiveOptions={
                <div className="pb-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('login')}>Iniciar sesión</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('register')}>Registrarse</ResponsiveNavLink>
                    </div>
                </div>
            }
        >
            {children}
        </CommonLayout>
    )
}
