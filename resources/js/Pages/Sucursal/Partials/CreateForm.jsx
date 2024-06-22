import {useForm} from "laravel-precognition-react";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import {router} from "@inertiajs/react";
import {useState} from "react";

export default function CreateForm() {
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
    } = useForm("post", route("admin.sucursal.store"), {
        name: "",
        code: "",
        address: "",
    });
    setValidationTimeout(500);

    const onSubmit = (e) => {
        e.preventDefault();
        if (hasErrors) {
            submit().catch();
        } else {
            router.post(route("admin.sucursal.store"), data, {
                onBefore: () => setDisableSubmit(true),
                onFinish: () => setDisableSubmit(false),
            });
        }
    };

    return (
        <div className="flex justify-center">
            <form
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 border border-gray-700 rounded-md sm:rounded-lg md:min-w-[550px] md:max-w-[700px]"
                onSubmit={onSubmit}
                method="post"
                autoComplete="off"
            >
                <div>
                    <InputLabel htmlFor="sucursal_name" value="Nombre *"/>
                    <TextInput
                        id="sucursal_name"
                        placeholder="Nombre de la sucursal"
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

                <div className="mt-4">
                    <InputLabel htmlFor="sucursal_code" value="Código *"/>
                    <TextInput
                        id="sucursal_code"
                        placeholder="Código de la sucursal"
                        type="text"
                        name="code"
                        value={data.code}
                        onChange={(e) => {
                            setData("code", e.target.value);
                            validate("code");
                        }}
                        onBlur={() => {
                            touch("code");
                            validate("code");
                        }}
                        className="mt-1 block w-full"
                        invalid={invalid("code")}
                        valid={valid("code")}
                    />
                    <InputError message={errors.code} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="sucursal_address" value="Dirección *"/>
                    <TextInput
                        id="sucursal_address"
                        placeholder="Dirección de la sucursal"
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={(e) => {
                            setData("address", e.target.value);
                            validate("address");
                        }}
                        onBlur={() => {
                            touch("address");
                            validate("address");
                        }}
                        className="mt-1 block w-full"
                        invalid={invalid("address")}
                        valid={valid("address")}
                    />
                    <InputError message={errors.address} className="mt-2"/>
                </div>
                <div className="mt-4">
                    <CyanButton
                        className="w-full justify-center"
                        disabled={disableSubmit || processing}
                    >
                        {disableSubmit || processing ? "Creando Sucursal..." : "Crear Sucursal"}
                    </CyanButton>
                </div>
            </form>
        </div>
    );
}
