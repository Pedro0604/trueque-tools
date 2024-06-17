import InputError from '@/Components/Inputs/InputError.jsx';
import InputLabel from '@/Components/Inputs/InputLabel.jsx';
import PrimaryButton from '@/Components/Buttons/PrimaryButton.jsx';
import TextInput from '@/Components/Inputs/TextInput.jsx';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {IconButton, Tooltip} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import SucursalOptions from "@/Pages/Sucursal/Partials/SucursalOptions.jsx";

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        surname: user.surname,
        birth_date: user.birth_date,
        sucursal_id: user.sucursal_id,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">Información del perfil</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre/s"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        invalid={errors.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="surname" value="Apellido/s *"/>

                    <TextInput
                        id="surname"
                        name="surname"
                        value={data.surname}
                        className="mt-1 block w-full"
                        invalid={errors.surname}
                        autoComplete="family-name"
                        onChange={(e) => {
                            setData('surname', e.target.value)
                        }}
                    />

                    <InputError message={errors.surname} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico *"/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        invalid={errors.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email}/>
                </div>
                <div className="mt-4">
                    <div className="flex items-center w-full justify-between">
                        <InputLabel htmlFor="birth_date" className="w-full" value="Fecha de nacimiento *"/>

                        <Tooltip
                            title="La fecha de nacimiento es necesaria ya que solo los usuarios mayores de edad pueden acceder al sistema"
                            placement="top"
                        >
                            <IconButton>
                                <HelpOutlineIcon className="text-gray-400" sx={{fontSize: 20}}/>
                            </IconButton>
                        </Tooltip>
                    </div>

                    <TextInput
                        id="birth_date"
                        type="date"
                        name="birth_date"
                        value={data.birth_date}
                        className="mt-1 block w-full"
                        invalid={errors.birth_date}
                        autoComplete="bday"
                        onChange={(e) => {
                            setData('birth_date', e.target.value)
                        }}
                    />

                    <InputError message={errors.birth_date} className="mt-2"/>
                </div>
                <div className="mt-4 lg:mt-0 h-24">
                    <InputLabel htmlFor="sucursal_id" value="Sucursal *"/>

                    <SelectInput
                        id="sucursal_id"
                        name="sucursal_id"
                        className="mt-1 block w-full"
                        invalid={errors.sucursal_id}
                        onChange={(e) => {
                            setData('sucursal_id', e.target.value)
                        }}
                        defaultValue={data.sucursal_id}
                    >
                        <option value="">Selecciona una sucursal</option>
                        <SucursalOptions/>
                    </SelectInput>

                    <InputError message={errors.sucursal_id} className="mt-2"/>
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
            </form>
        </section>
    );
}
