import {useEffect} from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Inputs/InputError.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import Divisor from "@/Components/Divisor.jsx";

export default function Login({status}) {
    const {data, setData, post, processing, errors, reset} =
        useForm({
            email: "",
            password: "",
            remember: false,
        });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Inicio de sesión"/>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        invalid={errors.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        invalid={errors.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                {/*TODO - LO COMENTO PARA LA DEMO, PERO CAPAZ ES MAS UTIL TENERLO DESCOMENTADO PARA DESAROLLAR*/}
                {/*<div className="block mt-4">*/}
                {/*    <label className="flex items-center">*/}
                {/*        <Checkbox*/}
                {/*            name="remember"*/}
                {/*            checked={data.remember}*/}
                {/*            onChange={(e) => setData('remember', e.target.checked)}*/}
                {/*        />*/}
                {/*        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Recordarme</span>*/}
                {/*    </label>*/}
                {/*</div>*/}

                <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-3 items-center justify-between mt-4">
                    <div className="flex flex-col gap-2">
                        <Link
                            href={route("register")}
                            className="underline mr-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            ¿Todavía no te registraste?
                        </Link>
                        <Link
                            href={route("empleado.login")}
                            className="underline mr-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            ¿Sos empleado o administrador?
                        </Link>
                    </div>

                    {/*TODO - DESCOMENTAR SI VAMOS A USAR EL RESET PASSWORD*/}
                    {/*{canResetPassword && (*/}
                    {/*    <Link*/}
                    {/*        href={route('password.request')}*/}
                    {/*        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"*/}
                    {/*    >*/}
                    {/*        Forgot your password?*/}
                    {/*    </Link>*/}
                    {/*)}*/}
                    <Divisor className="sm:hidden"/>

                    <PrimaryButton
                        className="w-full justify-center sm:w-fit max-w-7xl sm:ms-4 h-10"
                        disabled={processing}
                    >
                        Iniciar sesión
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
