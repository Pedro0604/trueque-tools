import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";
import StarIcon from "@mui/icons-material/Star";
import BusinessIcon from "@mui/icons-material/Business";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import CommentsList from "../Comment/CommentsList";
import Create from "@/Pages/Comment/Create.jsx";
import SolicitudsList from "@/Pages/Solicitud/SolicitudsList.jsx";
import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";
import Divisor from "@/Components/Divisor.jsx";
import PersonIcon from "@mui/icons-material/Person";
import Blur from "@/Components/Blur.jsx";
import SpeedIcon from "@mui/icons-material/Speed";
import IconWithText from "@/Components/IconWithText.jsx";
import CyanButton from "@/Components/Buttons/CyanButton.jsx";
import PromotionModal from "@/Components/PromotionModal.jsx";
import DangerButton from "@/Components/Buttons/DangerButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Show({
                                 product,
                                 comments,
                                 solicituds,
                                 preferenceId = null,
                                 trueque = null,
                             }) {
    const {auth} = usePage().props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openPromotionModal, setOpenPromotionModal] = useState(
        preferenceId !== null
    );
    const handleClosePromotionModal = () => setOpenPromotionModal(false);

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
                    {product.was_deleted &&
                        <div className="p-6 bg-gray-300 dark:bg-gray-800 rounded-lg mb-2">
                            <h2 className="text-3xl font-bold text-center uppercase text-red-600 dark:text-red-600">
                                El producto está eliminado
                            </h2>
                        </div>
                    }
                    <div
                        className={`mb-1 text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-t-lg rounded-b-sm`}
                    >
                        <div className="flex justify-between items-center mb-1 h-6">
                            <div className="flex gap-3 items-center">
                                <Link
                                    href={route("user.show", product.user.id)}
                                    className="hover:underline"
                                >
                                    <IconWithText
                                        icon={<PersonIcon/>}
                                        text={product.user.name}
                                    />
                                </Link>
                                <IconWithText
                                    icon={<SpeedIcon/>}
                                    text={product.user.reputation}
                                />
                            </div>
                            {product.isCurrentlyPromoted && (
                                <>
                                    {auth.user &&
                                        product.user.id === auth.user.id && (
                                            <p>
                                                Promocionado hasta el{" "}
                                                {product.promoted_until}
                                            </p>
                                        )}
                                </>
                            )}
                            <div className="flex gap-3">
                                {product.can.promote && (
                                    <>
                                        <PromotionModal
                                            open={openPromotionModal}
                                            handleClose={
                                                handleClosePromotionModal
                                            }
                                            productId={product.id}
                                            preferenceId={preferenceId}
                                        />
                                        <CyanButton
                                            isLink
                                            href={route(
                                                "promotion.mercadopago.createPreference",
                                                product.id
                                            )}
                                        >
                                            Promocionar
                                        </CyanButton>
                                    </>
                                )}
                                {product.can.update && (
                                    <>
                                        <PrimaryButton
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "product.edit",
                                                        product.id
                                                    )
                                                )
                                            }
                                        >
                                            <EditIcon/>
                                        </PrimaryButton>
                                    </>
                                )}
                                {product.can.delete && (
                                    <>
                                        <DangerButton
                                            onClick={() =>
                                                router.delete(
                                                    route(
                                                        "product.destroy",
                                                        product.id
                                                    )
                                                )
                                            }
                                        >
                                            <DeleteIcon/>
                                        </DangerButton>
                                    </>
                                )}

                                {product.isCurrentlyPromoted && (
                                    <StarIcon className="text-yellow-500"/>
                                )}
                            </div>
                        </div>

                        <div className="md:flex mt-3">
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
                                <IconWithText
                                    icon={<BusinessIcon/>}
                                    text={product.sucursal.name}
                                />
                                <p className="text-gray-600 dark:text-custom-beige-600">
                                    Dirección: {product.sucursal.address}
                                </p>
                                {product.can.createSolicitud && (
                                    <PrimaryButton
                                        isLink
                                        href={route(
                                            "solicitud.create",
                                            product.id
                                        )}
                                        isFullRounded
                                        className="mt-4 md:mt-8 py-2.5 align-middle justify-center w-full"
                                        preserveScroll
                                    >
                                        Solicitar Trueque
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                    </div>
                    {!product.was_deleted &&
                        <div className="p-6 bg-gray-300 dark:bg-gray-800 rounded-b-lg rounded-t-sm">
                            {product.can.createComment && (
                                <>
                                    <Create productId={product.id}/>
                                    <Divisor className="my-4 "/>
                                </>
                            )}
                            <CommentsList
                                comments={comments}
                                productUserId={product.user.id}
                            />
                        </div>
                    }
                </div>
                <div
                    className={`text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-4 md:p-6 rounded-lg h-fit
                    ${
                        (product.can.viewTrueque && trueque) ||
                        product.can.listSolicituds
                            ? "block"
                            : "hidden"
                    }`}
                >
                    {product.can.viewTrueque && trueque && (
                        <div className="max-w-lg">
                            <Trueque trueque={trueque}/>
                        </div>
                    )}
                    {product.can.listSolicituds && (
                        <SolicitudsList
                            isAuthor={product.user.id === auth.user.id}
                            solicituds={solicituds}
                            className={"w-80"}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedOrNormalLayout>
    );
}
