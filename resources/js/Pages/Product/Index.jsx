import {Head, router, usePage} from "@inertiajs/react";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import AddIcon from '@mui/icons-material/Add';
import ProductsList from "@/Pages/Product/Partials/ProductsList.jsx";
import SelectInput from "@/Components/Inputs/SelectInput.jsx";
import SucursalOptions from "@/Pages/Sucursal/Partials/SucursalOptions.jsx";
import CategoryOptions from "@/Components/CategoryOptions.jsx";

export default function Index({products, productCreatedId = null}) {
    const props = usePage().props;
    const auth = props.auth
    const queryParams = Object.assign({}, props.queryParams);

    const searchFieldChanged = (field, value) => {
        if (value) {
            queryParams[field] = value;
        } else {
            delete queryParams[field];
        }

        router.get(route('product.index', queryParams));
    }

    const emptyListMessage = `No hay productos cargados en el sistema ${queryParams.sucursal || queryParams.category ? 'para el filtro seleccionado' : ''}`;


    return (
        <AuthenticatedOrNormalLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Productos
                    </h2>
                    <div className="flex gap-8 justify-evenly">
                        <SelectInput
                            id="sucursal"
                            name="sucursal"
                            onChange={(e) => {
                                searchFieldChanged('sucursal', e.target.value)
                            }}
                            defaultValue={queryParams.sucursal}
                        >
                            <option value="">Sucursal</option>
                            <SucursalOptions/>
                        </SelectInput>
                        <SelectInput
                            id="category"
                            name="category"
                            onChange={(e) => {
                                searchFieldChanged('category', e.target.value)
                            }}
                            defaultValue={queryParams.category}
                        >
                            <option value="">Categoría</option>
                            <CategoryOptions/>
                        </SelectInput>
                        {auth.user &&
                            <CyanButton
                                isLink
                                href={route('product.create')}
                            >
                                <span className="hidden sm:block">Agregar nuevo producto</span>
                                <span className="sm:hidden"><AddIcon/></span>
                            </CyanButton>
                        }
                    </div>
                </div>
            }
        >
            <Head title="Productos"/>

            <ProductsList
                products={products}
                productCreatedId={productCreatedId}
                emptyListMessage={emptyListMessage}
                blurIfPaused
            />
        </AuthenticatedOrNormalLayout>
    )
}
