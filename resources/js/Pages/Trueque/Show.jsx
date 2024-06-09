import {Head, usePage} from "@inertiajs/react";
import {useState} from "react";
import AuthenticatedOrNormalLayout from "@/Layouts/AuthenticatedOrNormalLayout.jsx";
import BusinessIcon from "@mui/icons-material/Business.js";
import Product from "@/Pages/Product/Partials/Product.jsx";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";

export default function Show({
                                 trueque = null
                             }) {
    const {auth} = usePage().props;
    const [open, setOpen] = useState(false);

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

            <div className="flex gap-4 justify-center text-xl text-gray-800 dark:text-custom-beige-500 leading-tight">
                <Trueque
                    trueque={trueque}
                    withCategory={true}
                    withSucursal={true}
                />
            </div>
        </AuthenticatedOrNormalLayout>
    )
        ;
}
