import {Head, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TruequesList from "@/Pages/Trueque/Partials/TruequesList.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import {InputLabel} from "@mui/material";

export default function Index({trueques}) {
    const auth = usePage().props.auth;
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Trueques
                    </h2>
                    {(auth.admin || auth.empleado) && <>
                        <InputLabel htmlFor="trueque_code" value="Codigo"/>

                        <TextInput
                            id="trueque_code"
                            type="trueque_code"
                            name="trueque_code"
                            value={data.trueque_code}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("trueque_code", e.target.value)}
                        />
                    </>
                    }
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
