import {Link} from "@inertiajs/react";

export default function SecondaryButton({className = '', isLink, children, ...props}) {
    const classes = `inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700
                dark:text-gray-300 uppercase tracking-widest hover:bg-gray-50
                dark:hover:bg-gray-700 focus:bg-custom-beige-500 dark:focus:bg-gray-900
                active:bg-custom-beige-500 dark:active:bg-gray-900 focus:outline-none focus:ring-2
                focus:ring-custom-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                transition ease-in-out duration-150 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-gray-800 ${className}`;

    if (isLink) {
        return (
            <Link
                {...props}
                className={classes}
            >
                {children}
            </Link>
        )
    }
    return (
        <button
            {...props}
            className={classes}
        >
            {children}
        </button>
    )
}
