import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import CommonLayout from "@/Layouts/CommonLayout.jsx";

export default function Authenticated({user, header, children}) {
    {/* TODO - NO OLVIDARSE DE AGREGAR LOS LINKS EN navLinks y responsiveNavLinks */}
    return (
        <CommonLayout
            header={header}
            navLinks={
                <NavLink href={route('product.index')} active={route().current('product.*')}>
                    Productos
                </NavLink>
            }
            responsiveNavLinks={
                <ResponsiveNavLink href={route('product.index')} active={route().current('product.*')}>
                    Productos
                </ResponsiveNavLink>
            }
            headerOptions={
                <Dropdown>
                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        {/*TODO – DESCOMENTAR CUANDO HAYA QUE MOSTRAR LA EDICION DE USUARIO*/}
                        {/*<Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>*/}
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            }
            responsiveOptions={
                <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                        <div className="font-medium text-sm text-gray-500">{user.email}</div>
                    </div>

                    <div className="mt-3 space-y-1">
                        {/*TODO – DESCOMENTAR CUANDO HAYA QUE MOSTRAR LA EDICION DE USUARIO*/}
                        {/*<ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>*/}
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            }
        >
            {children}
        </CommonLayout>
    )
}
