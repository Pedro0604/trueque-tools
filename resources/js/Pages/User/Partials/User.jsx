import BusinessIcon from "@mui/icons-material/Business";
import SpeedIcon from "@mui/icons-material/Speed";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CakeIcon from '@mui/icons-material/Cake';
import IconWithText from "@/Components/IconWithText.jsx";

export default function User({
                                 user,
                                 withCantTrueques = false,
                                 className = "",
                                 ...props
                             }) {

    return (
        <div
            {...props}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800 transition-all
            rounded-lg p-4 border border-custom-beige-900 dark:border-custom-beige-500 ${className}`}
        >
            {user.was_deleted &&
                <div className="p-3 bg-gray-300 dark:bg-gray-800 rounded-lg mb-2">
                    <h2 className="text-xl font-bold text-center uppercase text-red-600 dark:text-red-600">
                        El usuario está eliminado
                    </h2>
                </div>
            }
            <div className="flex gap-3 flex-col overflow-hidden text-white">
                <span className="text-xl">{user.name} {user.surname}</span>
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
                Realizó {user.total_trueques} {user.total_trueques === 1 ? 'trueque' : 'trueques'}
            </div>
        </div>
    )
}
