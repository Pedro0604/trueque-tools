import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
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
    const {
        data,
        errors,
        setValidationTimeout,
        validateFiles,
        validate,
        setData,
        processing,
        touch,
        invalid,
        valid,
        hasErrors,
        submit
    } = useForm('post', route('product.store'), {
        image: '',
        name: '',
        description: '',
        category: '',
        sucursal_id: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (hasErrors) {
            submit().catch()
        } else {
            router.post(route('product.store'), data)
        }
    }
    setValidationTimeout(500);
    validateFiles();

    const descriptionLength = data.description.trim().length;
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
                    autoComplete="off"
                >
                    <div className="h-24">
                        <InputLabel
                            htmlFor="product_name"
                            value="Nombre *"
                        />
                        <TextInput
                            id="product_name"
                            placeholder="Nombre del producto"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={e => {
                                setData('name', e.target.value)
                                validate('name')
                            }}
                            onBlur={() => {
                                touch('name')
                                validate('name')
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid('name')}
                            valid={valid('name')}
                            isFocused={true}
                        />
                        <InputError message={errors.name} className="mt-2"/>
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_description"
                            value="Descripción *"
                        />
                        <TextAreaInput
                            id="product_description"
                            placeholder="Descripción del producto"
                            name="description"
                            value={data.description}
                            onChange={e => {
                                setData('description', e.target.value)
                                validate('description')
                            }}
                            onBlur={() => {
                                touch('description')
                                validate('description')
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid('description')}
                            valid={valid('description')}
                            rows={3}
                        />
                        <InputLabel
                            htmlFor="product_description"
                            value={`Mínimo ${descriptionLength}/60`}
                            className={`opacity-60 ${rightDescriptionLength ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                        />
                        {invalid('description') ?
                            <InputError message={errors.description}/>
                            :
                            <div className="mb-9"></div>
                        }
                    </div>
                    <div className="mt-4 h-24">
                        <InputLabel
                            htmlFor="product_category"
                            value="Categoría *"
                        />
                        <SelectInput
                            id="product_category"
                            name="category"
                            onChange={e => {
                                setData('category', e.target.value)
                                validate('category')
                            }}
                            onBlur={() => {
                                touch('category')
                                validate('category')
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid('category')}
                            valid={valid('category')}
                        >
                            <option value="">Elija una categoría</option>
                            <option value="1">{CATEGORIES_TEXT_MAP[1]}</option>
                            <option value="2">{CATEGORIES_TEXT_MAP[2]}</option>
                            <option value="3">{CATEGORIES_TEXT_MAP[3]}</option>
                        </SelectInput>
                        <InputError message={errors.category} className="mt-2"/>
                    </div>
                    <div className="mt-4 h-24">
                        <InputLabel
                            htmlFor="product_sucursal_id"
                            value="Sucursal donde realizar el trueque *"
                        />
                        <SelectInput
                            id="product_sucursal_id"
                            name="sucursal_id"
                            onChange={e => {
                                setData('sucursal_id', e.target.value)
                                validate('sucursal_id')
                            }}
                            onBlur={() => {
                                touch('sucursal_id')
                                validate('sucursal_id')
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid('sucursal_id')}
                            valid={valid('sucursal_id')}
                        >
                            <option value="">Elija una sucursal</option>
                            {sucursals.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.sucursal_id} className="mt-2"/>
                    </div>
                    <div className="mt-4 h-24">
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
                                    {
                                        setData('image', e.target.files[0])
                                        validate('image')
                                    }
                                }
                            }}
                            onBlur={(e) => {
                                touch('image')
                                if (e.target.files[0]) {
                                    validate('image')
                                }
                            }}
                            className="mt-1 block w-full"
                            invalid={invalid('image')}
                            valid={valid('image')}
                        />
                        <InputError message={errors.image} className="mt-2"/>
                    </div>
                    <div className="mt-4">
                        <CyanButton
                            className="w-full justify-center"
                            disabled={processing}
                        >
                            {processing ? 'Creando Producto...' : 'Crear Producto'}
                        </CyanButton>
                    </div>
                    <div className="mt-4">
                        <PrimaryButton
                            onClick={() => window.history.back()}
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
