import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";

export default function Register({sucursales}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email:'',
        surname: '',
        birth_date: '',
        sucursal_id:'',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="surname" value="Surname"/>

                    <TextInput
                        id="surname"
                        name="surname"
                        value={data.surname}
                        className="mt-1 block w-full"
                        autoComplete="surname"
                        onChange={(e) => setData('surname', e.target.value)}
                        required
                    />

                    <InputError message={errors.surname} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="birth_date" value="Birth_date"/>

                    <TextInput
                        id="birth_date"
                        type="date"
                        name="birth_date"
                        value={data.birth_date}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('birth_date', e.target.value)}
                        required
                    />

                    <InputError message={errors.birth_date} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="sucursal_id" value="Sucursal"/>

                    <SelectInput
                        id="sucursal_id"
                        name="sucursal_id"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('sucursal_id', e.target.value)}
                        required
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
                    <InputLabel htmlFor="password" value="Password"/>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
