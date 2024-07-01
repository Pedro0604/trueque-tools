import {useRef, useState} from "react";
import {useForm} from "@inertiajs/react";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import SecondaryButton from "@/Components/Buttons/SecondaryButton.jsx";
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import SucursalOptions from "@/Pages/Sucursal/Partials/SucursalOptions.jsx";

export default function DeleteSucursalForm({ className = '',
                                               selectedSucursal = null,
                                           }) {
    const [confirmingSucursalDeletion, setConfirmingSucursalDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        validate,
        touch,
        invalid,
        valid,
        errors,
    } = useForm({
        password: '',
    });

    const confirmSucursalDeletion = () => {
        setConfirmingSucursalDeletion(true);
    };

    const deleteSucursal = (e) => {
        e.preventDefault();

        destroy(route('sucursal.destroy', sucursal.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingSucursalDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <DangerButton
                onClick={confirmSucursalDeletion}
                className="w-full justify-center mt-4"
            >
                Eliminar
            </DangerButton>

            <Modal show={confirmingSucursalDeletion} onClose={closeModal}>
                <form onSubmit={deleteSucursal} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        ¿Estás seguro/a de que querés eliminar esta sucursal?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Una vez que se elimine la sucursal, toda su información y datos se eliminarán permanentemente.
                        Antes de eliminar tu cuenta, selecciona la 'sucursal de traspaso', que sera quien reciba todos los clientes,
                        productos, solicitudes y trueques que posee actualmente esta sucursal.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Contraseña"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="transfer_sucursal_id"
                            value="Sucursal donde se transferira informacion *"
                        />
                        <SelectInput
                            id="transfer_sucursal_id"
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
                            valid={selectedSucursal ?? valid("sucursal_id")}
                            disabled={selectedSucursal}
                            value={
                                selectedSucursal
                                    ? selectedSucursal.id
                                    : data.sucursal_id
                            }
                        >
                            <option value="">Elija una sucursal de transferencia</option>
                            <SucursalOptions/>
                        </SelectInput>
                        <InputError message={errors.sucursal_id} className="mt-2"/>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Eliminar sucursal
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
