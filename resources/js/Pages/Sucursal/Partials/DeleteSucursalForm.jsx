import {useRef, useState} from "react";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import SecondaryButton from "@/Components/Buttons/SecondaryButton.jsx";
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import SucursalOptions from "@/Pages/Sucursal/Partials/SucursalOptions.jsx";
import {useForm} from "@inertiajs/react";

export default function DeleteSucursalForm({className = '', sucursal}) {
    const [confirmingSucursalDeletion, setConfirmingSucursalDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        processing,
        delete: destroy,
        reset,
        errors,
        setError,
    } = useForm({
        password: '',
        transfer_sucursal_id: '',
    });

    const confirmSucursalDeletion = () => {
        setConfirmingSucursalDeletion(true);
    };

    const deleteSucursal = (e) => {
        e.preventDefault();

        destroy(route('admin.sucursal.destroy', sucursal.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset,
        });
    };

    const closeModal = () => {
        setConfirmingSucursalDeletion(false);
        setError('password', null);
        setError('transfer_sucursal_id', null);
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
                {sucursal.can.delete
                    ?
                    <form onSubmit={deleteSucursal} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            ¿Estás seguro/a de que querés eliminar la sucursal {sucursal.name}?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Una vez que se elimine la sucursal, toda su información y datos se eliminarán
                            permanentemente.
                            Antes de eliminar la sucursal, seleccione la 'sucursal de traspaso', que será la sucursal
                            que reciba todos los clientes,
                            productos, solicitudes y trueques (no exitosos) que posee actualmente esta sucursal.
                        </p>

                        <div className="mt-6">
                            <InputLabel htmlFor="password" value="Contraseña" className="sr-only"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                                isFocused
                                invalid={errors.password}
                                placeholder="Contraseña"
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="transfer_sucursal_id"
                                value="Sucursal donde se transferira informacion *"
                            />
                            <SelectInput
                                id="transfer_sucursal_id"
                                name="transfer_sucursal_id"
                                onChange={(e) => {
                                    setData("transfer_sucursal_id", e.target.value);
                                }}
                                className="mt-1 block w-full"
                                invalid={errors.transfer_sucursal_id}
                            >
                                <option value="">Elija una sucursal de transferencia</option>
                                <SucursalOptions
                                    except={sucursal.id}
                                />
                            </SelectInput>
                            <InputError message={errors.transfer_sucursal_id} className="mt-2"/>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={closeModal}
                                type="button"
                            >
                                Cancelar
                            </SecondaryButton>

                            <DangerButton className="ms-3" disabled={processing}>
                                Eliminar sucursal
                            </DangerButton>
                        </div>
                    </form>
                    :
                    <div
                        className="px-6 py-4"
                    >
                        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                            No podés eliminar la sucursal porque tiene empleados asignados
                        </h2>

                        <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                            Para poder eliminar la sucursal deberás reasignar los empleados a otra sucursal o eliminarlos.
                        </p>
                    </div>
                }
            </Modal>
        </section>
    )
        ;
}
