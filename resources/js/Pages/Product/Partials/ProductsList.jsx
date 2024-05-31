import Product from "@/Pages/Product/Partials/Product.jsx";

export default function ProductsList({products, productCreatedId = null}) {
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
                        />))}
                </div>
                :
                <h3 className="text-center text-3xl font-bold">No hay productos cargados en el sistema</h3>
            }
        </div>
    )
}
