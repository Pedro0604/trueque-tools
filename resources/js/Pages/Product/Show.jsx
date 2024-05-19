import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import {Head, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from '@mui/material/Modal';
import {useState} from "react";


export default function Show({product, auth}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    product = product.data;

    return (
        <AuthenticatedOrNormalLayout
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-custom-beige-500 leading-tight">
                        {product.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Producto "${product.name}"`}/>

            <div
                className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg lg:mx-32 xl:mx-64 2xl:mx-96">
                <div className="flex justify-between items-center mb-1 h-6">
                    <p className="text-gray-600 dark:text-custom-beige-500 text-sm">{product.user.name}</p>
                    {/*TODO - DESCOMENTAR CUANDO ESTE HABILITADA LA FUNCION DE PROMOCIONAR */}
                    {/*{product.promoted_at && <StarIcon className="text-yellow-500"/>}*/}
                </div>

                <div className="md:flex">
                    <div className={`w-full md:w-80`}>
                        {product.image_path ?
                            <>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    className="flex items-center justify-center"
                                >
                                    <img
                                        src={product.image_path}
                                        alt={product.name}
                                        className={`object-contain w-1/2`}
                                    />
                                </Modal>
                                <img
                                    src={product.image_path}
                                    alt={product.name}
                                    onClick={handleOpen}
                                    className={`object-cover w-full aspect-video md:aspect-square rounded-md cursor-pointer`}
                                />
                            </>
                            :
                            <div
                                className="flex flex-col text-center justify-center w-full aspect-video md:aspect-square rounded-md bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                                <p>IMAGEN NO ENCONTRADA</p>
                            </div>
                        }
                    </div>
                    <div className="mt-4 left-2 ml-5">
                        <p className="text-xl mb-2">{CATEGORIES_TEXT_MAP[product.category]}</p>
                        <p className="text-gray-600 text-sm dark:text-custom-beige-600 overflow-hidden h-16 break-all">{product.description}</p>
                        <div
                            className="flex items-center gap-1 mt-1 "
                        >
                            <BusinessIcon/>
                            <p className="text-gray-600 dark:text-custom-beige-600">
                                {product.sucursal.name}
                            </p>
                        </div>
                        <p className="text-gray-600 dark:text-custom-beige-600">
                            Dirección: {product.sucursal.address}
                        </p>
                    </div>
                </div>

                <PrimaryButton
                    onClick={() => {
                        router.get(route('product.index'));
                    }}
                    className="mt-4 md:mt-8"
                >
                    Volver
                </PrimaryButton>
            </div>
        </AuthenticatedOrNormalLayout>
    )
}
