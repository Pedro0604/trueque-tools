import BusinessIcon from '@mui/icons-material/Business';
import CyanButton from "@/Components/Buttons/CyanButton.jsx";


export default function Sucursal({
                                     sucursal
                                 }) {
    return (
        <div className="border border-cyan-500 rounded-md p-4">
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
            <CyanButton
                href={route('product.index', {sucursal: sucursal.id})}
                isLink
                className="w-full justify-center mt-4"
            >
                Ver productos
            </CyanButton>
        </div>
    )
}
