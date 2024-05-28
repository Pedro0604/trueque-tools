import {Head, useForm, usePage} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import Product from "@/Pages/Product/Partials/Product.jsx";
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import TextInput from "@/Components/Inputs/TextInput.jsx";
import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from '@mui/icons-material/Add';
import Modal from "@mui/material/Modal";
import {useState} from "react";
import {Box} from "@mui/material";
import ShowAvailableProducts from "@/Pages/Solicitud/Partials/ShowAvailableProducts.jsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};

export default function create({product, availableProducts}) {
    const {auth} = usePage().props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('solicitud.create', product.id))
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Solicitar Trueque a "{product.name}"
                    </h2>
                </div>
            }
        >
            <Head title={'Solicitar Trueque a "' + product.name + '"'}/>

            <div className="flex justify-center">
                <div
                    className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8
                            rounded-lg flex gap-8 justify-center w-fit">
                    <div className="w-72">
                        <Product product={product}/>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div
                            className="flex items-center gap-1 mt-1"
                        >
                            <BusinessIcon
                                sx={{fontSize: 32}}/>
                            <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-custom-beige-600">
                                {product.sucursal.name}
                            </p>
                        </div>
                        <MultipleStopIcon
                            sx={{fontSize: 40}}
                        />
                        <div>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <TextInput id={'meeting_date_time'} type={'datetime-local'}/>
                            </form>
                        </div>
                    </div>
                    <div
                        className="border border-cyan-50 w-72 rounded-md flex justify-center items-center cursor-pointer"
                        onClick={handleOpen}
                    >
                        <AddIcon
                            sx={{fontSize: 40}}
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    className="bg-gray-900 text-white"
                >
                    <ShowAvailableProducts
                        availableProducts={availableProducts}
                    />
                </Box>
            </Modal>
        </Authenticated>
    )
}
