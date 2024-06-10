import {Head, router} from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import TextAreaInput from "@/Components/Inputs/TextAreaInput.jsx";
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import {useState} from "react";
import {useForm} from "laravel-precognition-react";

export default function Create({
                                   sucursals
                               }) {
    const [disableSubmit, setDisableSubmit] = useState(false);

    const {
        data,
        errors,
        setValidationTimeout,
        validate,
        setData,
        processing,
        touch,
        invalid,
        valid,
        hasErrors,
        submit,
    } = useForm("post", route("admin.empleado.store"), {
        name: "",
        dni: "",
        sucursal_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (hasErrors) {
            submit().catch();
        } else {
            router.post(route("admin.empleado.store"), data, {
                onBefore: () => setDisableSubmit(true),
                onFinish: () => setDisableSubmit(false),
            });
        }
    };
    setValidationTimeout(500);

    return (
        <AdminLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Agregar un Empleado
                    </h2>
                </div>
            }
        >
            <Head title="Agregar Empleado"/>
            <div className="flex justify-center">
                <form
                    className="p-4 sm:p-8 flex flex-col gap-4 bg-white dark:bg-gray-800 border border-gray-700 rounded-md sm:rounded-lg md:min-w-[550px] md:max-w-[700px]"
                    onSubmit={onSubmit}
                    method="post"
                    autoComplete="off"
                >
                    <div>
                        <InputLabel
                            htmlFor="empleado_name"
                            value="Nombre *"
                        />
                        <TextInput
                            id="empleado_name"
                            placeholder="Nombre del empleado"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => {
                                setData("name", e.target.value);
                                validate("name");
                            }}
                            onBlur={() => {
                                touch("name");
                                validate("name");
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid("name")}
                            valid={valid("name")}
                            isFocused={true}
                        />
                        <InputError message={errors.name} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="empleado_dni"
                            value="DNI *"
                        />
                        <TextInput
                            id="empleado_dni"
                            placeholder="DNI del empleado"
                            type="text"
                            name="dni"
                            value={data.dni}
                            onChange={(e) => {
                                setData("dni", e.target.value);
                                validate("dni");
                            }}
                            onBlur={() => {
                                touch("dni");
                                validate("dni");
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid("dni")}
                            valid={valid("dni")}
                        />
                        <InputError message={errors.dni} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="empleado_sucursal_id"
                            value="Sucursal del empleado *"
                        />
                        <SelectInput
                            id="empleado_sucursal_id"
                            name="sucursal_id"
                            onChange={(e) => {
                                setData("sucursal_id", e.target.value);
                                validate("sucursal_id");
                            }}
                            onBlur={() => {
                                touch("sucursal_id");
                                validate("sucursal_id");
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid("sucursal_id")}
                            valid={valid("sucursal_id")}
                            value={data.sucursal_id}
                        >
                            <option value="">Elija una sucursal</option>
                            {sucursals.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.sucursal_id} className="mt-2"/>
                    </div>
                    <div className="mt-4">
                        <CyanButton
                            className="w-full justify-center"
                            disabled={disableSubmit || processing}
                        >
                            {disableSubmit || processing ? "Creando Empleado..." : "Crear Empleado"}
                        </CyanButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
