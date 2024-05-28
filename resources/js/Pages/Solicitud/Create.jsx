import {Head, router, useForm} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import Product from "@/Pages/Product/Partials/Product.jsx";
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import BusinessIcon from "@mui/icons-material/Business.js";
import TextInput from "@/Components/Inputs/TextInput.jsx";

export default function create({auth, product}) {
    const {
        data,
        setData,
        errors,
        post,
        processing,
    } = useForm({
        product_id: '',
        meeting_date_time: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('solicitud.create', product.id))
    }

    return (<Authenticated
        user={auth.user}
        header={
            <div className="flex gap-3 justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Solicitar Trueque a {product.name}
                </h2>
            </div>
        }
    >
        <Head title={"Solicitar Trueque a " + product.name}/>

        <div className="flex justify-center">
            <div
                className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg flex gap-8 justify-center w-fit">
                <div className="w-72">
                    <Product product={product}/>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <div
                        className="flex items-center gap-1 mt-1"
                    >
                        <BusinessIcon/>
                        <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-custom-beige-600">
                            {product.sucursal.name}
                        </p>
                    </div>
                    <MultipleStopIcon sx={{fontSize:40}}/>
                    <div>
                        <form
                            onSubmit={onSubmit}
                        >
                            <TextInput id={'meeting_date_time'} type={'datetime-local'}/>
                        </form>
                    </div>
                </div>
                <div className="border border-cyan-50 w-72 rounded-md text-center cursor-pointer"
                     onClick={() => {
                     }}
                >
                    +
                </div>
            </div>
        </div>
    </Authenticated>)
}
