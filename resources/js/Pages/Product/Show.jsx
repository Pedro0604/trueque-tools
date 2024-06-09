import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import StarIcon from "@mui/icons-material/Star";
import BusinessIcon from "@mui/icons-material/Business";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import {Head, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import CommentsList from "../Comment/CommentsList";
import Create from "@/Pages/Comment/Create.jsx";
import SolicitudsList from "@/Pages/Solicitud/SolicitudsList.jsx";
import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";
import Divisor from "@/Components/Divisor.jsx";
import PersonIcon from '@mui/icons-material/Person';
import Blur from "@/Components/Blur/Blur.jsx";

export default function Show({
                                 product,
                                 comments,
                                 solicituds,
                                 trueque = null
                             }) {
    const {auth} = usePage().props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <AuthenticatedOrNormalLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-custom-beige-500 leading-tight">
                        {product.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Producto "${product.name}"`}/>

            <div className="flex gap-4 justify-center">
                <div className="max-w-sm sm:max-w-lg lg:max-w-4xl lg:min-w-[800px]">
                    <div
                        className={`mb-1 text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-t-lg rounded-b-sm`}
                    >
                        <div className="flex justify-between items-center mb-1 h-6">
                            <div className="flex items-center">
                                <PersonIcon className="text-gray-300 mr-1"/>
                                <p className="text-gray-600 dark:text-custom-beige-500 text-sm">
                                    {product.user.name}
                                </p>
                            </div>
                            {/*TODO - DESCOMENTAR CUANDO ESTE HABILITADA LA FUNCION DE PROMOCIONAR */}
                            {/*{product.promoted_at && <StarIcon className="text-yellow-500"/>}*/}
                        </div>

                        <div className="md:flex">
                            <Blur
                                blur={product.isPaused}
                                message={"El producto esta pausado"}
                            >
                                <div className={`w-full md:w-80`}>
                                    {product.image_path ? (
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
                                                    className={`object-contain w-1/2 max-h-dvh`}
                                                />
                                            </Modal>
                                            <img
                                                src={product.image_path}
                                                alt={product.name}
                                                onClick={handleOpen}
                                                className={`object-cover w-full aspect-video md:aspect-square rounded-md cursor-zoom-in border border-custom-beige-900 dark:border-custom-beige-500`}
                                            />
                                        </>
                                    ) : (
                                        <div
                                            className="flex flex-col text-center justify-center w-full aspect-video md:aspect-square rounded-md bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                                            <p>IMAGEN NO ENCONTRADA</p>
                                        </div>
                                    )}
                                </div>
                            </Blur>
                            <div className="mt-4 left-2 ml-5">
                                <p className="text-xl mb-2">
                                    {CATEGORIES_TEXT_MAP[product.category]}
                                </p>
                                <p className="text-gray-600 text-sm dark:text-custom-beige-600 overflow-hidden h-16 break-all">
                                    {product.description}
                                </p>
                                <div className="flex items-center gap-1 mt-1 ">
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
                        <div className="flex justify-between">
                            <PrimaryButton
                                onClick={() => window.history.back()}
                                className="mt-4 md:mt-8"
                            >
                                Volver
                            </PrimaryButton>

                            {product.canCreateSolicitud && (
                                <PrimaryButton
                                    isLink
                                    href={route(
                                        "solicitud.create",
                                        product.id
                                    )}
                                    isFullRounded
                                    className="mt-4 md:mt-8 py-2.5 align-middle justify-center w-1/2"
                                    preserveScroll
                                >
                                    Solicitar Trueque
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                    <div className="p-6 bg-gray-300 dark:bg-gray-800 rounded-b-lg rounded-t-sm">
                        {product.canCreateComment &&
                            <>
                                <Create productId={product.id}/>
                                <Divisor
                                    className="my-4 "
                                />
                            </>
                        }
                        <CommentsList
                            comments={comments}
                            productUserId={product.user.id}
                        />
                    </div>
                </div>
                <div
                    className={`text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-4 md:p-6 rounded-lg h-fit
                    ${(product.canViewTrueque && trueque) || product.canListSolicituds ? 'block' : 'hidden'}`}
                >
                    {product.canViewTrueque && trueque &&
                        <div className="max-w-lg">
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">
                                Trueque
                            </h2>
                            <Trueque
                                trueque={trueque}
                            />
                        </div>
                    }
                    {product.canListSolicituds &&
                        <SolicitudsList
                            isAuthor={product.user.id === auth.user.id}
                            solicituds={solicituds}
                            className={"w-80"}
                        />
                    }
                </div>
            </div>
        </AuthenticatedOrNormalLayout>
    )
        ;
}
