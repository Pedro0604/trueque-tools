import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function Create({trueque}) {
    const {data, setData, errors, post, processing} = useForm({
        publishedUserProducts: [
            {bar_code: '', sell_price: ''}
        ],
        offeredUserProducts: [
            {bar_code: '', sell_price: ''}
        ]
    });

    const addProduct = (name, products) => {
        setData(name, [...products, {bar_code: '', sell_price: ''}]);
    };

    const removeProduct = (index, name, products) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setData(name, newProducts);
    }

    const updateProduct = (index, field, value, name, products) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setData(name, newProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("venta.store", trueque.id), {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Agregar Venta
                    </h2>
                </div>
            }
        >
            <Head title="Agregar Venta"/>
            <div className="flex justify-center">
                <div
                    className="flex flex-col gap-8 justify-center text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8
                            rounded-lg w-fit max-w-4xl"
                >
                    <Trueque
                        trueque={trueque}
                    />
                    <form
                        method="POST"
                        onSubmit={handleSubmit}>
                        <div
                            className="flex gap-20"
                        >
                            <div
                                className="w-full flex flex-col gap-4"
                            >
                                {data.publishedUserProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 border rounded-md px-6 py-5 relative"
                                    >
                                        <button
                                            onClick={() => removeProduct(index, 'publishedUserProducts', data.publishedUserProducts)}
                                            type="button"
                                            className="text-gray-800 dark:text-gray-200 hover:rounded-full hover:bg-gray-600 p-2 transition-all
                                            absolute top-2 right-2"
                                        >
                                            <CloseIcon/>
                                        </button>
                                        <div className="mt-4">
                                            <InputLabel htmlFor={`bar_code_${index}`} value="Código de barras"/>
                                            <TextInput
                                                placeholder="Codigo de barras"
                                                type="text"
                                                name={`bar_code_${index}`}
                                                value={product.bar_code}
                                                className="mt-1 block w-full"
                                                invalid={errors[`publishedUserProducts.${index}.bar_code`]}
                                                onChange={e => updateProduct(index, 'bar_code', e.target.value, 'publishedUserProducts', data.publishedUserProducts)}
                                            />
                                            <InputError message={errors[`publishedUserProducts.${index}.bar_code`]}
                                                        className="mt-2"/>
                                        </div>
                                        <div>
                                            <InputLabel htmlFor={`sell_price_${index}`} value="Precio de venta"/>
                                            <TextInput
                                                placeholder="Precio de venta"
                                                type="text"
                                                name={`sell_price_${index}`}
                                                value={product.sell_price}
                                                className="mt-1 block w-full"
                                                invalid={errors[`publishedUserProducts.${index}.sell_price`]}
                                                onChange={e => updateProduct(index, 'sell_price', e.target.value, 'publishedUserProducts', data.publishedUserProducts)}
                                            />
                                            <InputError
                                                message={errors[`publishedUserProducts.${index}.sell_price`]}
                                                className="mt-2"/>
                                        </div>
                                    </div>
                                ))}
                                <div
                                    className="text-center py-4 border rounded-md hover:bg-gray-700 cursor-pointer"
                                    onClick={() => addProduct('publishedUserProducts', data.publishedUserProducts)}
                                >
                                    <AddIcon/>
                                </div>
                            </div>
                            <div
                                className="w-full flex flex-col gap-4"
                            >
                                {data.offeredUserProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 border rounded-md px-6 py-5 relative"
                                    >
                                        <button
                                            onClick={() => removeProduct(index, 'offeredUserProducts', data.offeredUserProducts)}
                                            type="button"
                                            className="text-gray-800 dark:text-gray-200 hover:rounded-full hover:bg-gray-600 p-2 transition-all
                                            absolute top-2 right-2"
                                        >
                                            <CloseIcon/>
                                        </button>
                                        <div className="mt-4">
                                            <InputLabel htmlFor={`bar_code_${index}`} value="Código de barras"/>
                                            <TextInput
                                                placeholder="Codigo de barras"
                                                type="text"
                                                name={`bar_code_${index}`}
                                                value={product.bar_code}
                                                className="mt-1 block w-full"
                                                invalid={errors[`offeredUserProducts.${index}.bar_code`]}
                                                onChange={e => updateProduct(index, 'bar_code', e.target.value, 'offeredUserProducts', data.offeredUserProducts)}
                                            />
                                            <InputError message={errors[`offeredUserProducts.${index}.bar_code`]}
                                                        className="mt-2"/>
                                        </div>
                                        <div>
                                            <InputLabel htmlFor={`sell_price_${index}`} value="Precio de venta"/>
                                            <TextInput
                                                placeholder="Precio de venta"
                                                type="text"
                                                name={`sell_price_${index}`}
                                                value={product.sell_price}
                                                className="mt-1 block w-full"
                                                invalid={errors[`offeredUserProducts.${index}.sell_price`]}
                                                onChange={e => updateProduct(index, 'sell_price', e.target.value, 'offeredUserProducts', data.offeredUserProducts)}
                                            />
                                            <InputError message={errors[`offeredUserProducts.${index}.sell_price`]}
                                                        className="mt-2"/>
                                        </div>
                                    </div>
                                ))}
                                <div
                                    className="text-center py-4 border rounded-md hover:bg-gray-700 cursor-pointer"
                                    onClick={() => addProduct('offeredUserProducts', data.offeredUserProducts)}
                                >
                                    <AddIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 ">
                            <InputError
                                message={errors.publishedUserProducts}
                                className="w-full text-center !text-lg"/>
                            <PrimaryButton className="w-full justify-center h-10 mt-2" disabled={processing}>
                                {processing ? 'Agregando venta...' : 'Agregar venta'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>
    )
        ;
}
