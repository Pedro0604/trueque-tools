import {Link} from "@inertiajs/react";

export default function DangerButton({className = '', isLink, children, ...props}) {
    const classes = `inline-flex items-center px-4 py-2 bg-red-600
                border border-transparent rounded-md font-semibold text-xs text-white
                uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                transition ease-in-out duration-150 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-custom-beige-300 ${className}`;

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
