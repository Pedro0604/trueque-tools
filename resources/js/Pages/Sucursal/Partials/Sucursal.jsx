import BusinessIcon from '@mui/icons-material/Business';
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import IconWithText from "@/Components/IconWithText.jsx";
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function Sucursal({
                                     sucursal
                                 }) {
    return (
        <div className="border border-cyan-500 rounded-md p-4">
            <div className="flex justify-between mb-4">
                <BusinessIcon/>
                <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">
                    {sucursal.code}
                </p>
            </div>
            <p className="text-sm sm:text-base lg:text-2xl text-gray-600 dark:text-custom-beige-600 mb-2">
                {sucursal.name}
            </p>
            <IconWithText
                icon={<LocationOnIcon/>}
                text={sucursal.address}
            />
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
