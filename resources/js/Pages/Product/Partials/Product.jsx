export default function Product({product}) {
    const showProduct = (productId) => {
        // TODO - Descomentar cuando se cree la ruta product.show
        // router.get(route('product.show', productId));
        // TODO - Borrar esta linea
        console.log('show product', productId)
    }

    return (
        <div
            onClick={() => showProduct(product.id)}
            className="bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
            lg:hover:bg-gray-200 lg:hover:dark:bg-gray-700 lg:hover:shadow-2xl transition-all
            rounded-lg p-4 cursor-pointer"
        >
            <p className="text-gray-600 dark:text-gray-400 text-sm">{product.user.name}</p>
            <img
                src={product.image_path}
                alt={product.name}
                className="w-full object-cover h-64 rounded-md"
            />
            <div className="mt-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                <p className="text-gray-600 dark:text-gray-400">Categoria: {product.category}</p>
                <p className="text-gray-600 dark:text-gray-400">Sucursal: {product.sucursal.name}</p>
                {product.promoted_at && <p className="text-gray-600 dark:text-gray-400">Promocionado</p>}
            </div>
        </div>
    )
}
