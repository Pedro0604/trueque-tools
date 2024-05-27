import {Link} from "@inertiajs/react";

export default function CyanButton({className = '', children, isLink, ...props}) {
    const classes =
        `inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-custom-cyan-400
                border border-transparent rounded-md font-semibold text-xs text-white
                dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700
                dark:hover:bg-custom-cyan-300 focus:bg-gray-700 dark:focus:bg-custom-cyan-500
                active:bg-gray-900 dark:active:bg-custom-cyan-500 focus:outline-none focus:ring-2
                focus:ring-custom-cyan-700 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition
                ease-in-out duration-150 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-custom-cyan-400
                ${className}`;

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
