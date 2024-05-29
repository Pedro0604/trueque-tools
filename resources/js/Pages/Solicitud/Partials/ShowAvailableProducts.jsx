import Product from "@/Pages/Product/Partials/Product.jsx";
import {useState} from "react";
import CreateForm from "@/Pages/Product/Partials/CreateForm";

export default function ShowAvailableProducts({availableProducts, onSelectProduct, sucursals, publishedProduct}) {
    const [showCreateProductForm, setShowCreateForm] = useState(false)

    // TODO - HACER FORMULARIO SCROLLABLE
    if(showCreateProductForm){
        return(
            <CreateForm
                sucursals={sucursals}
                selectedSucursal={publishedProduct.sucursal}
                selectedCategory={publishedProduct.category}
            />
        )
    }
    return (
        // TODO - AÑADIR SLIDER PARA MOSTRAR MAS DE 3 PRODUCTOS
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableProducts.map(product => (
                <Product
                    key={product.id}
                    product={product}
                    onClick={() => onSelectProduct(product)}
                    withUserName={false}
                    withSucursal={false}
                    withCategory={false}
                />))}
            <div
                onClick={() => setShowCreateForm(true)}
                className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl transition-all
                rounded-lg p-4 cursor-pointer border border-custom-beige-900 dark:border-custom-beige-500
                flex justify-center items-center`}
            >
                Crear un nuevo producto
            </div>
        </div>
    )
}
