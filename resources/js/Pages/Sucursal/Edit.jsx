import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";

export default function Edit({className = '', sucursal, onSuccess }) {

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        name: sucursal.name,
        code: sucursal.code,
        address: sucursal.address,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('sucursal.update', sucursal.id), {
            onSuccess: () => {
                onSuccess();
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">Información de la sucursal</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <div className="mt-4">
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

                    <div className="flex items-center gap-4">
                        <PrimaryButton
                            disabled={processing}
                            className="w-full justify-center"
                        >
                            Guardar
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Guardado.</p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    )

}
