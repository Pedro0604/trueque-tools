import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {LinearProgress} from "@mui/material";
import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import CyanButton from "@/Components/CyanButton.jsx";

export default function create({auth, sucursals}) {
    sucursals = sucursals.data;

    const {data, setData, post, processing, errors, progress} = useForm({
        image: '',
        name: '',
        description: '',
        category: '',
        sucursal_id: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('product.store'))
    }

    const descriptionLength = data.description.length;
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
                    <div className="">
                        <InputLabel
                            htmlFor="product_name"
                            value="Nombre *"
                        />
                        <TextInput
                            id="product_name"
                            placeholder="Product name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full"
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
                            placeholder="Product Description"
                            name="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="mt-1 block w-full"
                            rows={3}
                        />
                        <InputLabel
                            htmlFor="product_description"
                            value={`Mínimo ${descriptionLength}/60`}
                            className={`opacity-60 ${rightDescriptionLength ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'}`}
                        />
                        <InputError message={errors.description} className="mt-2"/>
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_category"
                            value="Categoría *"
                        />
                        <SelectInput
                            id="product_category"
                            name="category"
                            onChange={e => setData('category', e.target.value)}
                            className="mt-1 block w-full"
                        >
                            <option value="">Elija una categoría</option>
                            <option value="1">{CATEGORIES_TEXT_MAP[1]}</option>
                            <option value="2">{CATEGORIES_TEXT_MAP[2]}</option>
                            <option value="3">{CATEGORIES_TEXT_MAP[3]}</option>
                        </SelectInput>
                        <InputError message={errors.category} className="mt-2"/>
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="product_sucursal_id"
                            value="Sucursal donde realizar el trueque *"
                        />
                        <SelectInput
                            id="product_sucursal_id"
                            name="sucursal"
                            onChange={e => setData('sucursal_id', e.target.value)}
                            className="mt-1 block w-full"
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
                                    setData('image', e.target.files[0])
                                }
                            }}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.image} className="mt-2"/>
                        {progress &&
                            <LinearProgress
                                variant="determinate"
                                value={progress?.percentage}
                            />
                        }
                    </div>
                    <div className="mt-8">
                        <CyanButton
                            className="w-full justify-center"
                            disabled={processing}
                        >
                            {processing ? 'Creando Producto...' : 'Crear Producto'}
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
