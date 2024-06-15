import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

export default function Empleado({
                                     empleado,
                                     className = "",
                                     ...props
                                 }) {

    return (
        <div
            {...props}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800 transition-all
            rounded-lg p-4 border border-custom-beige-900 dark:border-custom-beige-500 ${className}`}
        >
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                    <PersonIcon className="text-gray-300 mr-1"/>
                    <p className="text-gray-600 dark:text-custom-beige-600 text-sm">{empleado.name}</p>
                </div>
            </div>
            <div className="flex gap-2 sm:gap-4 sm:flex-col overflow-hidden">
                <div>
                    <p className="text-sm sm:text-lg my-2">DNI: {empleado.dni}</p>
                    <div
                        className="flex items-center gap-1 mt-1"
                    >
                        <BusinessIcon/>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">
                            {empleado.sucursal.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
