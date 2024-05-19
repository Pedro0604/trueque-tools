import {Link} from "@inertiajs/react";

export default function PrimaryButton({className = '', isLink, children, ...props}) {
    const classes = `inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-custom-beige-300
                border border-transparent rounded-md font-semibold text-xs text-white
                dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700
                dark:hover:bg-custom-beige-100 focus:bg-gray-700 dark:focus:bg-custom-beige-500
                active:bg-gray-900 dark:active:bg-custom-beige-500 focus:outline-none focus:ring-2
                focus:ring-custom-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800
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
