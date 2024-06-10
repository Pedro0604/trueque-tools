import Product from "@/Pages/Product/Partials/Product.jsx";
import {usePage} from "@inertiajs/react";

export default function ProductsList({
                                         products,
                                         productCreatedId = null,
                                         emptyListMessage = "No hay productos cargados",
                                         blurIfPaused = false
                                     }) {

    const auth = usePage().props.auth;

    return (
        <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
            {products.length > 0 ?
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    {products.map(product => (
                        <Product
                            key={product.id}
                            created={productCreatedId === product.id}
                            product={product}
                            blurIfPaused={blurIfPaused}
                        />))}
                </div>
                : <>
                    <h3 className="text-center text-3xl font-bold">
                        {emptyListMessage}
                    </h3>
                    {auth.user &&
                        <h4 className="text-center text-2xl font-bold mt-6">
                            Cargá un producto ahora mismo haciendo click en el botón de arriba ⭡
                        </h4>
                    }
                </>
            }
        </div>
    )
}
