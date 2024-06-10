import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";

export default function Fail({trueque, truequeErrors}) {
    const {setData, errors, post, processing} = useForm({
        published_error_id: '0',
        offered_error_id: '0',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("trueque.fail", trueque.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Informar fallo en el trueque "{trueque.code}"
                    </h2>
                </div>
            }
        >
            <Head
                title={'Informar fallo en el trueque "' + trueque.code + '"'}
            />

            <div className="flex justify-center">
                <div
                    className="flex flex-col gap-8 justify-center text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8
                            rounded-lg w-fit"
                >
                    <Trueque
                        trueque={trueque}
                        showHover={false}
                        showHoverOnProduct
                        showCursorPointer={false}
                        onClick={() => {
                        }}
                    />
                    <form
                        method="POST"
                        onSubmit={handleSubmit}>
                        <div
                            className="flex gap-20"
                        >
                            <div className="mt-4 w-full">
                                <InputLabel
                                    htmlFor="published_error_id"
                                    value={`Elija el error del producto ${trueque.solicitud.published_product.name}`}
                                />

                                <SelectInput
                                    id="published_error_id"
                                    name="published_error_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        setData('published_error_id', e.target.value)
                                    }}
                                >
                                    <option value="0">No tuvo ningún error</option>
                                    {truequeErrors.map((truequeError) => (
                                        <option key={truequeError.id} value={truequeError.id}>
                                            {truequeError.message}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError message={errors.published_error_id} className="mt-2"/>
                            </div>
                            <div className="mt-4 w-full">
                                <InputLabel
                                    htmlFor="offered_error_id"
                                    value={`Elija el error del producto ${trueque.solicitud.offered_product.name}`}
                                />

                                <SelectInput
                                    id="offered_error_id"
                                    name="offered_error_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        setData('offered_error_id', e.target.value)
                                    }}
                                >
                                    <option value="0">No tuvo ningun error</option>
                                    {truequeErrors.map((truequeError) => (
                                        <option key={truequeError.id} value={truequeError.id}>
                                            {truequeError.message}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError message={errors.offered_error_id} className="mt-2"/>
                            </div>
                        </div>
                        <DangerButton className="w-full justify-center h-10 mt-12" disabled={processing}>
                            {processing ? 'Informando fallo...' : 'Informar fallo'}
                        </DangerButton>
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>);
}
