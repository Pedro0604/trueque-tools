import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import {router} from "@inertiajs/react";

export default function Product({product}) {
    const showProduct = (productId) => {
        router.get(route('product.show', productId));
    }

    return (

        <div
            onClick={() => showProduct(product.id)}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                lg:hover:bg-gray-200 lg:hover:dark:bg-gray-700 lg:hover:shadow-2xl transition-all
                rounded-lg p-4 cursor-pointer`}
        >
            <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm">{product.user.name}</p>
                {product.promoted_at && <StarIcon className="text-yellow-500"/>}
            </div>
            {product.image_path ?
                <img
                    src={product.image_path}
                    alt={product.name}
                    className={`object-cover h-64 rounded-md `}
                />
                :
                <div className="flex items-center justify-center w-64 h-64 rounded-md bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                    IMAGEN NO ENCONTRADA
                </div>
            }
            <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400 text-ellipsis line-clamp-1">{product.name}</p>
                <p className="text-xl my-2">{CATEGORIES_TEXT_MAP[product.category]}</p>
                <p className="text-gray-600 text-sm dark:text-gray-500 overflow-hidden text-ellipsis line-clamp-3 h-16">{product.description}</p>
                <div
                    className="flex items-center gap-1 mt-1"
                >
                    <BusinessIcon/>
                    <p className="text-gray-600 dark:text-gray-400">
                        {product.sucursal.name}
                    </p>
                </div>
            </div>
        </div>
    )
}
