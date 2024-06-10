import {Head, usePage} from "@inertiajs/react";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";

export default function Show({
                                 trueque = null
                             }) {
    const auth = usePage().props.auth;

    return (
        <AuthenticatedOrNormalLayout
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-custom-beige-500 leading-tight">
                        {`"${trueque.solicitud.published_product.user.name}" - "${trueque.solicitud.offered_product.user.name}"`}
                    </h2>
                </div>
            }
        >
            <Head title={`Trueque`}/>

            <div className="flex justify-center text-xl text-gray-800 dark:text-custom-beige-500 w-full">
                <Trueque
                    trueque={trueque}
                    withCategory={true}
                    withSucursal={true}
                    onClick={() => {
                    }}
                    showHover={false}
                    showHoverOnProduct
                    showCursorPointer={false}
                    showActionButtons
                    className="max-w-6xl"
                />
            </div>
        </AuthenticatedOrNormalLayout>
    )
        ;
}
