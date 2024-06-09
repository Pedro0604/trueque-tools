import {Head, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TruequesList from "@/Pages/Trueque/Partials/TruequesList.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import {useState} from "react";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";

export default function Index({trueques}) {
    const auth = usePage().props.auth;
    const [code, setCode] = useState("")
    const [filteredTrueques, setFilteredTrueques] = useState(trueques);

    const changeCode = (code) => {
        setCode(code)
        setFilteredTrueques(trueques.filter(trueque => trueque.code.toLowerCase().includes(code.toLowerCase())))
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Trueques
                    </h2>
                    {(auth.admin || auth.empleado) &&
                        <div className="flex items-center">
                            <InputLabel
                                htmlFor="code"
                                value="Código de trueque: "
                                className="mr-2 text-xl"
                            />

                            <TextInput
                                id="code"
                                type="text"
                                name="code"
                                value={code}
                                className="block w-full"
                                invalid={false}
                                onChange={(e) => changeCode(e.target.value)}
                            />

                            <InputError message={""} className="mt-2"/>
                        </div>
                    }
                </div>
            }
        >
            <Head title="Trueques"/>

            <TruequesList
                trueques={filteredTrueques}
                emptyListMessage={code ? `No hay trueques con el código ${code}` :"No hay trueques realizados"}
            />
        </AuthenticatedLayout>
    )
}
