import StatisticsLayout from "@/Pages/Admin/Statistics/StatisticsLayout.jsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper} from "@mui/material";
import {Link} from "@inertiajs/react";


export default function MostTruequesUsers({users}) {
    return (
        <StatisticsLayout>
            <div
                className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg w-fit mx-auto"
            >
                {users.length ?
                    <TableContainer component={Paper}  style={{backgroundColor: '#2D2D2D', color: 'white'}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{color: 'white'}}>Posición</TableCell>
                                    <TableCell style={{color: 'white'}}>Nombre</TableCell>
                                    <TableCell style={{color: 'white'}}>Cantidad de trueques</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" style={{color: user.was_deleted ? `gray` : 'white'}}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell style={{color: user.was_deleted ? `gray` : 'white'}}>
                                            <Link
                                                href={route('user.show', user.id)}
                                                className="hover:underline"
                                            >
                                                {user.name} {user.surname} {user.was_deleted ? '(eliminado)': ''}
                                            </Link>
                                        </TableCell>
                                        <TableCell style={{color: user.was_deleted ? `gray` : 'white'}}>{user.total_trueques}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <h3 className="text-center text-3xl font-bold">
                        No hay usuarios con trueques
                    </h3>
                }
            </div>
        </StatisticsLayout>
    )
}
