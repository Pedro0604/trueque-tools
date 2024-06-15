import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import SpeedIcon from "@mui/icons-material/Speed";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CakeIcon from '@mui/icons-material/Cake';
import IconWithText from "@/Components/IconWithText.jsx";

export default function User({
                                 user,
                                 className = "",
                                 ...props
                             }) {

    return (
        <div
            {...props}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800 transition-all
            rounded-lg p-4 border border-custom-beige-900 dark:border-custom-beige-500 ${className}`}
        >
            <div className="flex gap-3 flex-col overflow-hidden">
                <IconWithText
                    icon={<PersonIcon/>}
                    text={`${user.name} ${user.surname}`}
                />
                <IconWithText
                    icon={<SpeedIcon/>}
                    text={`${user.reputation}`}
                />
                <IconWithText
                    icon={<AlternateEmailIcon/>}
                    text={`${user.email}`}
                />
                <IconWithText
                    icon={<CakeIcon/>}
                    text={`${user.birth_date}`}
                />
                <IconWithText
                    icon={<BusinessIcon/>}
                    text={`${user.sucursal.name}`}
                />
            </div>
        </div>
    )
}
