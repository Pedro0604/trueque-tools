import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import IconWithText from "@/Components/IconWithText.jsx";
import SpeedIcon from "@mui/icons-material/Speed.js";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail.js";
import CakeIcon from "@mui/icons-material/Cake.js";
import BusinessIcon from "@mui/icons-material/Business.js";

export default function Show({
                                user
                             }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-custom-beige-500 leading-tight">
                        {user.name}
                    </h2>
                </div>
            }
        >

            <Head title={`Usuario "${user.name}"`}/>

            <div
                className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800 transition-all
                rounded-lg p-4 border border-custom-beige-900 dark:border-custom-beige-500
                align-middle w-fit`}
            >
                <div className="flex gap-3 flex-col overflow-hidden text-gray-300">
                    <span className="text-xl text-custom-beige-200 font-bold">{user.name} {user.surname}</span>
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
        </AuthenticatedLayout>
)
}
