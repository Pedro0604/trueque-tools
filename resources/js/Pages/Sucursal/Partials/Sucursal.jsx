import BusinessIcon from '@mui/icons-material/Business';


export default function Sucursal({
                                     sucursal
                                 }) {
    return (
        <div className="border border-cyan-500 rounded-md p-4 lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl cursor-pointer">
            <div className="flex justify-between mb-4">
                <BusinessIcon></BusinessIcon>
                <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">
                    {sucursal.code}
                </p>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-custom-beige-600">
                Nombre: {sucursal.name}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-custom-beige-600">
                Dirección: {sucursal.address}
            </p>
        </div>
    )
}
