import {Head} from "@inertiajs/react";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import AddIcon from '@mui/icons-material/Add';
import ProductsList from "@/Pages/Product/Partials/ProductsList.jsx";

export default function Index({auth, products, productCreatedId = null}) {
    return (
        <AuthenticatedOrNormalLayout
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Listado de Productos
                    </h2>
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
            }
        >
            <Head title="Productos"/>

            <ProductsList
                products={products}
                productCreatedId={productCreatedId}
                emptyListMessage="No hay productos cargados en el sistema"
                blurIfPaused
            />
        </AuthenticatedOrNormalLayout>
    )
}
