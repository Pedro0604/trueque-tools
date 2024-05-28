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

export default function create({publishedProduct, availableProducts}) {
    const {auth} = usePage().props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const {
        data,
        setData,
        errors,
        post,
        processing,
    } = useForm({
        offered_product_id: '',
        meeting_date_time: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('solicitud.create', publishedProduct.id))
    }

    const handleSelectProduct = (product) => {
        handleClose();
        setData('offered_product_id', product.id)
        setSelectedProduct(product);
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Solicitar Trueque a "{publishedProduct.name}"
                    </h2>
                </div>
            }
        >
            <Head title={'Solicitar Trueque a "' + publishedProduct.name + '"'}/>

            <div className="flex justify-center">
                <div
                    className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8
                            rounded-lg flex gap-8 justify-center w-fit">
                    <div className="w-72">
                        <Product
                            product={publishedProduct}
                            withSucursal={false}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div
                            className="flex items-center gap-1 mt-1"
                        >
                            <BusinessIcon
                                sx={{fontSize: 32}}/>
                            <p className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-custom-beige-600">
                                {publishedProduct.sucursal.name}
                            </p>
                        </div>
                        <MultipleStopIcon
                            sx={{fontSize: 40}}
                        />
                        <div>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <TextInput
                                    id={'meeting_date_time'}
                                    type={'datetime-local'}
                                />
                            </form>
                        </div>
                    </div>
                    {selectedProduct === null ?
                        <div
                            className={`bg-gray-200 dark:bg-gray-700 lg:bg-gray-100 lg:dark:bg-gray-800
                                        lg:hover:bg-gray-200 lg:hover:dark:bg-custom-gray-700 lg:hover:shadow-2xl transition-all
                                        rounded-lg p-4 cursor-pointer border border-custom-beige-900 dark:border-custom-beige-500
                                        flex justify-center items-center w-72`}
                            onClick={handleOpen}
                        >
                            <AddIcon
                                sx={{fontSize: 40}}
                            />
                        </div>
                        :
                        <div className="w-72">
                            <Product
                                product={selectedProduct}
                                withSucursal={true}
                                onClick={handleOpen}
                            />
                        </div>
                    }
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
                        onSelectProduct={handleSelectProduct}
                    />
                </Box>
            </Modal>
        </Authenticated>
    )
}