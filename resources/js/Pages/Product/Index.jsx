import {Head} from "@inertiajs/react";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import Product from "@/Pages/Product/Partials/Product.jsx";
import CyanButton from "@/Components/CyanButton.jsx";
import AddIcon from '@mui/icons-material/Add';

export default function Index({auth, products, productCreatedId = null}) {

    return (
        <AuthenticatedOrNormalLayout
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Productos
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

            <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    {products.data.map(product => (
                        <Product
                            key={product.id}
                            created={productCreatedId === product.id}
                            product={product}
                        />))}
                </div>
            </div>
        </AuthenticatedOrNormalLayout>
    )
}
