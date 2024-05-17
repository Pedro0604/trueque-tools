import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children, register = false }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center px-8 pt-12 pb-12 lg:p-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 2xl:w-52 2xl:h-52 fill-current text-gray-500" />
                </Link>
            </div>

            <div className={`w-full ${register ? "w-full lg:w-fit sm:max-w-lg lg:max-w-7xl" : "sm:max-w-lg"} mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg`}>
                {children}
            </div>
        </div>
    );
}
