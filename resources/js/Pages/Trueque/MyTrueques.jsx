import {Head} from "@inertiajs/react";
import TruequesList from "@/Pages/Trueque/Partials/TruequesList.jsx";
import UserLayout from "@/Layouts/UserLayout.jsx";

export default function MyTrueques({trueques}) {
    return (
        <UserLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Mis Trueques
                    </h2>
                </div>
            }
        >
            <Head title="Mis Trueques"/>

            <TruequesList
                trueques={trueques}
                emptyListMessage="Todavía no realizaste ningún trueque"
            />
        </UserLayout>
    )
}
