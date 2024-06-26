import {useEffect, useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Inputs/InputError.jsx';
import InputLabel from '@/Components/Inputs/InputLabel.jsx';
import PrimaryButton from '@/Components/Buttons/PrimaryButton.jsx';
import TextInput from '@/Components/Inputs/TextInput.jsx';
import {Head, Link, router} from '@inertiajs/react';
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import Divisor from "@/Components/Divisor.jsx";
import {IconButton, Tooltip} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useForm} from "laravel-precognition-react";
import SucursalOptions from "@/Pages/Sucursal/Partials/SucursalOptions.jsx";

export default function Register() {
    const [disableSubmit, setDisableSubmit] = useState(false);

    const {
        data,
        setData,
        errors,
        reset,
        setValidationTimeout,
        validate,
        touch,
        invalid,
        valid,
        submit,
        hasErrors
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
        if (hasErrors) {
            submit().catch()
        } else {
            router.post(route('register'), data, {
                onBefore: () => setDisableSubmit(true),
                onFinish: () => setDisableSubmit(false),
            });
        }
    };
    setValidationTimeout(500);

    return (
        <GuestLayout register>
            <Head title="Registrarse"/>

            <form onSubmit={onSubmit} className="lg:flex gap-8 justify-center p-4">
                <div className="lg:min-w-96 lg:max-w-96">
                    <div className="h-24">
                        <InputLabel htmlFor="name" value="Nombre/s *"/>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            invalid={invalid('name')}
                            valid={valid('name')}
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => {
                                setData('name', e.target.value)
                                validate('name')
                            }}
                            onBlur={() => {
                                touch('name')
                                validate('name')
                            }}
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="mt-4 h-24">
                        <InputLabel htmlFor="surname" value="Apellido/s *"/>

                        <TextInput
                            id="surname"
                            name="surname"
                            value={data.surname}
                            className="mt-1 block w-full"
                            invalid={invalid('surname')}
                            valid={valid('surname')}
                            autoComplete="family-name"
                            onChange={(e) => {
                                setData('surname', e.target.value)
                                validate('surname')
                            }}
                            onBlur={() => {
                                touch('surname')
                                validate('surname')
                            }}
                        />

                        <InputError message={errors.surname} className="mt-2"/>
                    </div>

                    <div className="mt-4 h-24">
                        <InputLabel htmlFor="email" value="Correo electrónico *"/>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="email"
                            className="mt-1 block w-full"
                            invalid={invalid('email')}
                            valid={valid('email')}
                            onChange={(e) => {
                                setData('email', e.target.value)
                                validate('email')
                            }}
                            onBlur={() => {
                                touch('email')
                                validate('email')
                            }}
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>

                    <div className="mt-4 h-24">
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
                            invalid={invalid('birth_date')}
                            valid={valid('birth_date')}
                            autoComplete="bday"
                            onChange={(e) => {
                                setData('birth_date', e.target.value)
                                validate('birth_date')
                            }}
                            onBlur={() => {
                                touch('birth_date')
                                validate('birth_date')
                            }}
                        />

                        <InputError message={errors.birth_date} className="mt-2"/>
                    </div>
                </div>

                <div className="lg:min-w-96 lg:max-w-96">
                    <div className="mt-4 lg:mt-0 h-24">
                        <InputLabel htmlFor="sucursal_id" value="Sucursal *"/>

                        <SelectInput
                            id="sucursal_id"
                            name="sucursal_id"
                            className="mt-1 block w-full"
                            invalid={invalid('sucursal_id')}
                            valid={valid('sucursal_id')}
                            onChange={(e) => {
                                setData('sucursal_id', e.target.value)
                                validate('sucursal_id')
                            }}
                            onBlur={() => {
                                touch('sucursal_id')
                                validate('sucursal_id')
                            }}
                        >
                            <option value="">Selecciona una sucursal</option>
                            <SucursalOptions/>
                        </SelectInput>

                        <InputError message={errors.sucursal_id} className="mt-2"/>
                    </div>

                    <div className="mt-4 h-24">
                        <InputLabel htmlFor="password" value="Contraseña *"/>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            invalid={invalid('password')}
                            valid={valid('password')}
                            autoComplete="new-password"
                            onChange={(e) => {
                                setData('password', e.target.value)
                                validate('password')
                            }}
                            onBlur={() => {
                                touch('password')
                                validate('password')
                            }}
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="mt-4 h-24">
                        <InputLabel htmlFor="password_confirmation" value="Confirmación de la contraseña *"/>

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            invalid={invalid('password_confirmation')}
                            valid={valid('password_confirmation')}
                            autoComplete="new-password"
                            onChange={(e) => {
                                setData('password_confirmation', e.target.value)
                                validate('password_confirmation')
                            }}
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

                        <PrimaryButton className="lg:ms-4 w-full justify-center h-10" disabled={disableSubmit}>
                            {disableSubmit ? 'Registrando...' : 'Registrate'}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
