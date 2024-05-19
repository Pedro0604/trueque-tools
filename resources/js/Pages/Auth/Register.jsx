import {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, router} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";
import Divisor from "@/Components/Divisor.jsx";
import {IconButton, Tooltip} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useForm} from "laravel-precognition-react";

export default function Register({sucursales}) {
    const {
        data,
        setData,
        processing,
        errors,
        reset,
        setValidationTimeout,
        validate,
        touch
    } = useForm('post', route('register'), {
        name: '',
        email: '',
        surname: '',
        birth_date: '',
        sucursal_id: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        router.post(route('register'), data);
    };
    setValidationTimeout(500);

    return (
        <GuestLayout register>
            <Head title="Register"/>

            <form onSubmit={onSubmit} className="lg:flex gap-8 justify-center p-4">
                <div className="lg:min-w-96">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre/s *"/>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            onBlur={() => {
                                touch('name')
                                validate('name')
                            }}
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="surname" value="Apellido/s *"/>

                        <TextInput
                            id="surname"
                            name="surname"
                            value={data.surname}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('surname', e.target.value)}
                            onBlur={() => {
                                touch('surname')
                                validate('surname')
                            }}
                        />

                        <InputError message={errors.surname} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Correo electrónico *"/>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="email"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            onBlur={() => {
                                touch('email')
                                validate('email')
                            }}
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
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
                            autoComplete="bday"
                            onChange={(e) => setData('birth_date', e.target.value)}
                            onBlur={() => {
                                touch('birth_date')
                                validate('birth_date')
                            }}
                        />

                        <InputError message={errors.birth_date} className="mt-2"/>
                    </div>
                </div>

                <div className="lg:min-w-96">
                    <div className="mt-4 lg:mt-0">
                        <InputLabel htmlFor="sucursal_id" value="Sucursal *"/>

                        <SelectInput
                            id="sucursal_id"
                            name="sucursal_id"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('sucursal_id', e.target.value)}
                            onBlur={() => {
                                touch('sucursal_id')
                                validate('sucursal_id')
                            }}
                        >
                            <option value="">Selecciona una sucursal</option>
                            {sucursales.data.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.name}
                                </option>
                            ))}
                        </SelectInput>

                        <InputError message={errors.sucursal_id} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña *"/>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            onBlur={() => {
                                touch('password')
                                validate('password')
                            }}
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirmación de la contraseña *"/>

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            onBlur={() => {
                                touch('password_confirmation')
                                validate('password_confirmation')
                            }}
                        />

                        <InputError message={errors.password_confirmation} className="mt-2"/>
                    </div>

                    <div
                        className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-3 items-center justify-end mt-8 lg:mt-14">
                        <Link
                            href={route('login')}
                            className="text-nowrap underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            ¿Ya tenés una cuenta?
                        </Link>

                        <Divisor className="lg:hidden"/>

                        <PrimaryButton className="lg:ms-4 w-full justify-center h-10" disabled={processing}>
                            Registrate
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
