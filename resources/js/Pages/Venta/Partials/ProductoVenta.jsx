import QrCode2Icon from '@mui/icons-material/QrCode2';
import IconWithText from "@/Components/IconWithText.jsx";
export default function ProductoVenta({productoVenta}){
    return (
        <div className="flex flex-col gap-2 border rounded-md p-2">
            <div
                className="text-lg font-bold"
            >
                {productoVenta.name}
            </div>
            ${productoVenta.sell_price}
        </div>
    )
}
