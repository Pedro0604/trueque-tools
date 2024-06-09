import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TruequesList from "@/Pages/Trueque/Partials/TruequesList.jsx";

export default function Index({trueques}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Trueques
                    </h2>
                </div>
            }
        >
            <Head title="Trueques"/>

            <TruequesList
                trueques={trueques}
                emptyListMessage="No hay trueques realizados"
            />
        </AuthenticatedLayout>
    )
}
