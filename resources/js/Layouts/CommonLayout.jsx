import {useState} from "react";
import {Link, usePage} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import InformationBanner from "@/Components/InformationBanner.jsx";

export default function CommonLayout({
                                         header,
                                         navLinks,
                                         responsiveNavLinks,
                                         headerOptions,
                                         responsiveOptions,
                                         children,
                                     }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const {error, success} = usePage().props.flash;

    const container =
        <div className="p-6 sm:p-8 md:p-12">{children}</div>

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav
                className="bg-white dark:bg-gray-800 border-b border-bottom-width:thin border-bottom-custom-teal-500 dark:border-custom-teal-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo
                                        className="block h-12 w-auto fill-current text-gray-800 dark:text-gray-200"/>
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {navLinks}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                {headerOptions}
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {responsiveNavLinks}
                    </div>

                    {responsiveOptions}
                </div>
            </nav>

            {header && (
                <header
                    className="bg-white dark:bg-gray-800
                    shadow border-b border-bottom-width:thin
                    border-bottom-custom-cyan-500 dark:border-custom-cyan-700"
                >
                    <div
                        className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8"
                    >
                        {header}
                    </div>
                </header>
            )}

            {error &&
                <InformationBanner
                    severity="error"
                >
                    {error}
                </InformationBanner>
            }
            {success &&
                <InformationBanner
                    severity="success"
                >
                    {success}
                </InformationBanner>
            }
            <main>{container}</main>
        </div>
    );
}
