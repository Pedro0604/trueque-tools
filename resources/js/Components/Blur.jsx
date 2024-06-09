export default function Blur({message = "No disponible", blur = false, className, children}) {
    return (
        <div
            className="relative"
        >
            {blur &&
                <div
                    className={`w-2/3 absolute top-1/2 left-1/2 trans z-40 font-bold text-xl
                    bg-white dark:bg-gray-300 text-gray-200 dark:text-gray-800 text-center px-3 py-2 rounded-lg
                    transform -translate-x-1/2 -translate-y-1/2 ${className}`}
                >
                    <h3>{message}</h3>
                </div>
            }
            <div
                className={`${blur ? 'blur-sm': ''}`}
            >
                {children}
            </div>
        </div>
    )
}
