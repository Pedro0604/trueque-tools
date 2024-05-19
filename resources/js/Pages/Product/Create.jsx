import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useForm} from 'laravel-precognition-react';
import InputLabel from "@/Components/InputLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import CyanButton from "@/Components/CyanButton.jsx";

export default function create({auth, sucursals}) {
    sucursals = sucursals.data;

    const form = useForm('post', route('product.store'), {
        image: '',
        name: '',
        description: '',
        category: '',
        sucursal_id: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        form.submit();
    }
    form.setValidationTimeout(500);
    form.validateFiles();

    const descriptionLength = form.data.description.length;
    const rightDescriptionLength = descriptionLength >= 60;

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Agregar un Producto
                    </h2>
                </div>
            }
        >
            <Head title="Agregar Producto"/>

            <div className="flex justify-center">
                <form
                    className="p-4 sm:p-8 bg-white dark:bg-gray-800 border border-gray-700 rounded-md sm:rounded-lg md:min-w-[550px] md:max-w-[700px]"
                    onSubmit={onSubmit}
                    method="post"
                >
                    <div>
                        <InputLabel
                            htmlFor="product_name"
                            value="Nombre *"
                        />
                        <TextInput
                            id="product_name"
                            placeholder="Product name"
                            type="text"
                            name="name"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.target.value)}
                            onBlur={() => form.validate('name')}
                            className="mt-1 block w-full"
                            isFocused={true}
                        />
                        {form.invalid('name') && <InputError message={form.errors.name} className="mt-2"/>}
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_description"
                            value="Descripción *"
                        />
                        <TextAreaInput
                            id="product_description"
                            placeholder="Product Description"
                            name="description"
                            value={form.data.description}
                            onChange={e => form.setData('description', e.target.value)}
                            onBlur={() => form.validate('description')}
                            className="mt-1 block w-full"
                            rows={3}
                        />
                        <InputLabel
                            htmlFor="product_description"
                            value={`Mínimo ${descriptionLength}/60`}
                            className={`opacity-60 ${rightDescriptionLength ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                        />
                        {form.invalid('description') && <InputError message={form.errors.description}/>}
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_category"
                            value="Categoría *"
                        />
                        <SelectInput
                            id="product_category"
                            name="category"
                            onChange={e => form.setData('category', e.target.value)}
                            onBlur={() => form.validate('category')}
                            className="mt-1 block w-full"
                        >
                            <option value="">Elija una categoría</option>
                            <option value="1">{CATEGORIES_TEXT_MAP[1]}</option>
                            <option value="2">{CATEGORIES_TEXT_MAP[2]}</option>
                            <option value="3">{CATEGORIES_TEXT_MAP[3]}</option>
                        </SelectInput>
                        {form.invalid('category') && <InputError message={form.errors.category} className="mt-2"/>}
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_sucursal_id"
                            value="Sucursal donde realizar el trueque *"
                        />
                        <SelectInput
                            id="product_sucursal_id"
                            name="sucursal_id"
                            onChange={e => form.setData('sucursal_id', e.target.value)}
                            onBlur={() => form.validate('sucursal_id')}
                            className="mt-1 block w-full"
                        >
                            <option value="">Elija una sucursal</option>
                            {sucursals.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.name}
                                </option>
                            ))}
                        </SelectInput>
                        {form.invalid('sucursal_id') && <InputError message={form.errors.sucursal_id} className="mt-2"/>}
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_image_path"
                            value="Imagen (opcional)"
                        />
                        <TextInput
                            id="product_image_path"
                            placeholder="Image Path"
                            type="file"
                            name="image"
                            onChange={e => {
                                if (e.target.files[0] && e.target.files[0].size > 6291456) {
                                    alert("La imagen es muy grande.\nPor favor elija una imagen más pequeña o reduzca el tamaño de la misma.");
                                    e.target.value = "";
                                } else {
                                    form.setData('image', e.target.files[0])
                                }
                            }}
                            onBlur={() => form.validate('image')}
                            className="mt-1 block w-full"
                        />
                        {form.invalid('image') && <InputError message={form.errors.image} className="mt-2"/>}
                    </div>
                    <div className="mt-8">
                        <CyanButton
                            className="w-full justify-center"
                            disabled={form.processing}
                        >
                            {form.processing ? 'Creando Producto...' : 'Crear Producto'}
                        </CyanButton>
                    </div>
                    <div className="mt-4">
                        <PrimaryButton
                            onClick={() => {
                                history.back();
                                return false;
                            }}
                            className="w-full justify-center"
                        >
                            Volver
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    )
}
