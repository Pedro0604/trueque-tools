import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import BusinessIcon from '@mui/icons-material/Business';
import {router} from "@inertiajs/react";
import {useEffect, useState} from "react";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function Product({product, created}) {
    const [isPulsing, setIsPulsing] = useState(created);
    const showProduct = (productId) => {
        router.get(route('product.show', productId));
    }

    useEffect(() => {
        if (created) {
            const timeoutId = setTimeout(() => {
                setIsPulsing(false);
            }, 6000); // Remove the class after 2 seconds

            return () => clearTimeout(timeoutId); // Clean up the timeout if the component is unmounted
        }
    }, [created]);

    return (

        <div
            onClick={() => showProduct(product.id)}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl transition-all
                rounded-lg p-4 cursor-pointer border border-custom-beige-900 dark:border-custom-beige-500
                ${isPulsing ? 'animate-pulse' : ''}`}
        >
            <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600 dark:text-custom-beige-600 text-sm">{product.user.name}</p>
                {/*TODO - DESCOMENTAR CUANDO ESTE HABILITADA LA FUNCION DE PROMOCIONAR */}
                {/*{product.promoted_at && <StarIcon className="text-yellow-500"/>}*/}
            </div>
            <div className="flex gap-2 sm:gap-4 sm:flex-col overflow-hidden">
                <div className="w-2/5 min-w-24 sm:w-full">
                    {product.image_path ?
                        <img
                            src={product.image_path}
                            alt={product.name}
                            className={`object-cover w-full aspect-square rounded-md  border border-custom-beige-900 dark:border-custom-beige-500`}
                        />
                        :
                        <div
                            className="flex items-center justify-center w-full aspect-square rounded-md bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                            <p className="hidden sm:inline">IMAGEN NO ENCONTRADA</p>
                            <span className="sm:hidden">
                                <ImageNotSupportedIcon
                                    sx={{fontSize: 32}}
                                />
                            </span>
                        </div>
                    }
                </div>
                <div className="mt-4">
                    <p className="text-xs sm:text-base text-gray-600 dark:text-custom-beige-600 text-ellipsis line-clamp-1">{product.name}</p>
                    <p className="text-sm sm:text-xl my-2">{CATEGORIES_TEXT_MAP[product.category]}</p>
                    <div
                        className="hidden sm:flex items-center gap-1 mt-1"
                    >
                        <BusinessIcon/>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">
                            {product.sucursal.name}
                        </p>
                    </div>
                </div>
            </div>
            <p className="sm:hidden text-gray-600 text-xs sm:text-sm dark:text-custom-beige-600 text-ellipsis line-clamp-2 my-2">{product.description}</p>
            <div
                className="flex sm:hidden items-center gap-1 mt-1"
            >
                <BusinessIcon/>
                <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">
                    {product.sucursal.name}
                </p>
            </div>
        </div>
    )
}
