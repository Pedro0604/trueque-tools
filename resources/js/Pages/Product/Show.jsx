import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";


export default function Show({product, auth}) {
    product = product.data;

    return (
        <AuthenticatedOrNormalLayout
            user={auth.user}
            authenticatedHeader={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Productos
                    </h2>
                </div>
            }
            normalHeader={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Productos
                    </h2>
                </div>
            }
        >
            <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm">{product.user.name}</p>
                {product.promoted_at && <StarIcon className="text-yellow-500"/>}
            </div>


            <div className="flex">
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
                <div className="mt-4 left-2 ml-5">
                    <p className="text-gray-600 dark:text-gray-400">{product.name}</p>
                    <p className="text-xl my-2">{CATEGORIES_TEXT_MAP[product.category]}</p>
                    <p className="text-gray-600 text-sm dark:text-gray-500 overflow-hidden h-16 break-all">{product.description}</p>
                    <div
                        className="flex items-center gap-1 mt-1 "
                    >
                        <BusinessIcon/>
                        <p className="text-gray-600 dark:text-gray-400">
                            {product.sucursal.name}
                        </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Dirección: {product.sucursal.address}
                    </p>
                </div>
            </div>
        </AuthenticatedOrNormalLayout>
    )
}
