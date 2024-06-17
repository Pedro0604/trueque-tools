import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import BusinessIcon from '@mui/icons-material/Business';
import {router} from "@inertiajs/react";
import {useEffect, useState} from "react";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import PersonIcon from '@mui/icons-material/Person';
import Blur from "@/Components/Blur.jsx";
import SpeedIcon from '@mui/icons-material/Speed';
import StarIcon from "@mui/icons-material/Star";
import IconWithText from "@/Components/IconWithText.jsx";

export default function Product({
                                    product,
                                    created,
                                    onClick = null,
                                    withUserName = true,
                                    withSucursal = true,
                                    withCategory = true,
                                    minImageWidth = "min-w-24",
                                    className = "",
                                    blurIfPaused = false,
                                    error = null,
                                    ...props
                                }) {
    const [isPulsing, setIsPulsing] = useState(created);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    }

    const showProduct = (productId) => {
        router.get(route('product.show', productId));
    }

    useEffect(() => {
        if (created) {
            const timeoutId = setTimeout(() => {
                setIsPulsing(false);
            }, 4000); // Remove the class after 2 seconds

            return () => clearTimeout(timeoutId); // Clean up the timeout if the component is unmounted
        }
    }, [created]);

    return (
        <div
            {...props}
            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800 cursor-pointer
                transition-all rounded-lg p-4 border border-custom-beige-900 dark:border-custom-beige-500
                ${isPulsing ? 'animate-pulse' : ''} ${className}`}
            onClick={onClick ? onClick : () => showProduct(product.id)}
        >
            {error &&
                <div
                    className="w-full text-lg text-red-600 dark:text-red-400"
                >
                    {error.message}
                </div>
            }
            <div className="flex justify-between items-center mb-1">
                {withUserName &&
                    <div className="flex gap-3 items-center">
                        <IconWithText
                            icon={<PersonIcon/>}
                            text={product.user.name}
                            textSize={"text-sm"}
                        />
                        <IconWithText
                            icon={<SpeedIcon/>}
                            text={product.user.reputation}
                            textSize={"text-sm"}
                        />
                    </div>
                }
                {product.isCurrentlyPromoted && <StarIcon className="text-yellow-500"/>}
            </div>
            <div className="flex gap-2 sm:gap-4 sm:flex-col overflow-hidden">
                <Blur
                    blur={blurIfPaused && product.isPaused}
                    message={"El producto esta pausado"}
                >
                    <div className={`w-2/5 ${minImageWidth} sm:w-full`}>
                        {product.image_path ?
                            <>
                                {isLoading &&
                                    <div
                                        className="flex items-center justify-center w-full aspect-square rounded-md bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                                        <p className="hidden sm:inline">Cargando imagen...</p>
                                        <span className="sm:hidden">
                                        <ImageNotSupportedIcon
                                            sx={{fontSize: 32}}
                                        />
                                    </span>
                                    </div>
                                }
                                <img
                                    src={product.image_path}
                                    alt={product.name}
                                    onLoad={handleImageLoad}
                                    style={{display: isLoading ? 'none' : 'block'}}
                                    className={`object-cover w-full aspect-square rounded-md  border border-custom-beige-900 dark:border-custom-beige-500`}
                                />
                            </>
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
                </Blur>
                <div>
                    <p className="text-xs sm:text-base text-gray-600 dark:text-custom-beige-600 text-ellipsis line-clamp-1">{product.name}</p>
                    {withCategory &&
                        <p className="text-sm sm:text-xl my-2">{CATEGORIES_TEXT_MAP[product.category]}</p>}
                    {withSucursal &&
                        <IconWithText
                            icon={<BusinessIcon/>}
                            text={product.sucursal.name}
                        />
                    }
                </div>
            </div>
            <p className="sm:hidden text-gray-600 text-xs sm:text-sm dark:text-custom-beige-600 text-ellipsis line-clamp-2 my-2">{product.description}</p>
            <div
                className="sm:hidden"
            >
                {withSucursal &&
                    <IconWithText
                        icon={<BusinessIcon/>}
                        text={product.sucursal.name}
                    />
                }
            </div>
        </div>
    )
}
