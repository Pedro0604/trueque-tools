import BusinessIcon from '@mui/icons-material/Business';
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import IconWithText from "@/Components/IconWithText.jsx";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {router, usePage} from "@inertiajs/react";

export default function Sucursal({
                                     sucursal
                                 }) {

    const {auth} = usePage().props;

    return (
        <div className="border border-cyan-500 rounded-md p-4">
            <div className="flex justify-between mb-4">
                <IconWithText
                    icon={<BusinessIcon/>}
                    text={sucursal.name}
                    textSize={"text-2xl"}
                    textColor={"text-custom-beige-200"}
                />
                <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">
                    {sucursal.code}
                </p>
            </div>
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
            {auth.admin &&
                <CyanButton
                    onClick={() =>
                        router.get(
                            route(
                                "sucursal.edit",
                                sucursal.id
                            )
                        )
                    }
                    className="w-full justify-center mt-4"
                >
                    Modificar
                </CyanButton>
            }
        </div>
    )
}
