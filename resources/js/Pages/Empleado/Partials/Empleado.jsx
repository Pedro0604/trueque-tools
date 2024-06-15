import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import IconWithText from "@/Components/IconWithText.jsx";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

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
            <IconWithText
                icon={<PersonIcon/>}
                text={empleado.name}
                textSize={"text-lg"}
            />
            <IconWithText
                icon={<FingerprintIcon/>}
                text={empleado.dni}
                textSize={"text-lg"}
            />
            <IconWithText
                icon={<BusinessIcon/>}
                text={empleado.sucursal.name}
                textSize={"text-lg"}
            />
        </div>
    )
}
