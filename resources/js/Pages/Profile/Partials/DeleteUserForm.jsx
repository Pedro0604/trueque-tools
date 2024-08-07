import {useRef, useState} from 'react';
import DangerButton from '@/Components/Buttons/DangerButton.jsx';
import InputError from '@/Components/Inputs/InputError.jsx';
import InputLabel from '@/Components/Inputs/InputLabel.jsx';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/Buttons/SecondaryButton.jsx';
import TextInput from '@/Components/Inputs/TextInput.jsx';
import {useForm} from '@inertiajs/react';

export default function DeleteUserForm({className = '', user}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Eliminar cuenta</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Una vez que se elimine tu cuenta, toda tu información y datos se eliminarán permanentemente.
                    Antes de eliminar tu cuenta, descargá cualquier dato o información que desees conservar.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Eliminar cuenta</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                {user.can.delete ? <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            ¿Estás seguro/a de que querés eliminar tu cuenta?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Una vez que se elimine tu cuenta, toda tu información y datos se eliminarán permanentemente.
                            Ingrese su contraseña para confirmar que deseas eliminar permanentemente tu cuenta.
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
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="Contraseña"
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                            <DangerButton className="ms-3" disabled={processing}>
                                Eliminar cuenta
                            </DangerButton>
                        </div>
                    </form>
                    :
                    <div
                        className="px-6 py-4"
                    >
                        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                            No puede eliminar su cuenta porque tiene trueques pendientes
                        </h2>

                        <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                            Para proceder con la eliminación primero concrete o cancele sus trueques pendientes.
                        </p>
                        <SecondaryButton onClick={closeModal} className="mt-4 mb-4 float-end">Cerrar</SecondaryButton>
                    </div>
                }
            </Modal>
        </section>
    );
}
