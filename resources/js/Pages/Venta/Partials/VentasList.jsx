import TableContainer from "@mui/material/TableContainer";
import {Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Link} from "@inertiajs/react";

export default function VentasList({
                                       ventas,
                                       emptyListMessage = "No hay ventas realizadas",
                                   }) {

    return (
        <div
            className="flex justify-center"
        >
            <div
                className={`text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg`}>
                {ventas.length ?
                    <TableContainer component={Paper} style={{backgroundColor: '#2D2D2D', color: 'white'}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{color: 'white'}}>Fecha</TableCell>
                                    <TableCell style={{color: 'white'}}>Trueque</TableCell>
                                    <TableCell style={{color: 'white'}}>Monto total</TableCell>
                                    <TableCell style={{color: 'white'}}>Ver detalle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ventas.map((venta) => (
                                    <TableRow
                                        key={venta.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell
                                                   style={{color: 'white'}}>{venta.created_at}</TableCell>
                                        <TableCell scope="row"
                                                   style={{color: 'white'}}>
                                            <Link
                                                href={route('trueque.show', venta.trueque.id)}
                                                className="hover:underline"
                                            >
                                                {venta.trueque.code}
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                                   style={{color: 'white'}}>${venta.total}</TableCell>
                                        <TableCell component="th" scope="row"
                                                   style={{color: 'white'}}>
                                            <Link
                                                href={route('venta.show', venta.id)}
                                                className="hover:underline"
                                            >
                                                Detalle
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <>
                        <h3 className="text-center text-3xl font-bold">
                            {emptyListMessage}
                        </h3>
                    </>
                }
            </div>
        </div>
    )
}
