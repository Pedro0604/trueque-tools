import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import User from "@/Pages/User/Partials/User.jsx";

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
                className="flex justify-center"
            >
                <User
                    user={user}
                    className="w-fit"
                />
            </div>
        </AuthenticatedLayout>
    )
}
