import BusinessIcon from '@mui/icons-material/Business';


export default function Sucursal({sucursal
                                }) {
    return (
                <div className="border border-cyan-500 rounded-md p-4 ">
                    <BusinessIcon></BusinessIcon>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">>
                        {sucursal.name}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">>
                        {sucursal.address}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-custom-beige-600">>
                        {sucursal.code}
                    </p>
                </div>
)
}
