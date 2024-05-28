import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import CreateForm from "./Partials/CreateForm";

export default function Create({sucursals}) {

    return (
        <Authenticated
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Agregar un Producto
                    </h2>
                </div>
            }
        >
            <Head title="Agregar Producto"/>
            <CreateForm sucursals={sucursals}/>
        </Authenticated>
    )
}
