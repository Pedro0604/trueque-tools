import StatisticsLayout from "@/Pages/Admin/Statistics/StatisticsLayout.jsx";
import {Link, router, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import TableContainer from "@mui/material/TableContainer";
import {Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function TruequesBetweenDates({trueques}) {
    const queryParams = Object.assign({}, usePage().props.queryParams);

    const searchFieldChanged = (field, value) => {
        if (value) {
            queryParams[field] = value;
        } else {
            delete queryParams[field];
        }

        router.get(route('admin.statistics.truequesBetweenDates', queryParams));
    }

    const emptyListMessage = `No hay trueques cargados en el sistema ${queryParams.start_date && queryParams.end_date ? 'para las fechas seleccionadas' : ''}`;

    return (
        <StatisticsLayout
            header={
                <div className="flex gap-4">
                    <div>
                        <InputLabel
                            htmlFor="start_date"
                            value="Fecha de inicio"
                            className="text-xl ms-1"
                        />
                        <TextInput
                            id="start_date"
                            name="start_date"
                            type="date"
                            onChange={(e) => {
                                searchFieldChanged('start_date', e.target.value)
                            }}
                            defaultValue={queryParams.start_date}
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="end_date"
                            value="Fecha de fin"
                            className="text-xl ms-1"
                        />
                        <TextInput
                            id="end_date"
                            name="end_date"
                            type="date"
                            onChange={(e) => {
                                searchFieldChanged('end_date', e.target.value)
                            }}
                            defaultValue={queryParams.end_date}
                        />
                    </div>
                </div>
            }
        >
            <div
                className="flex flex-col gap-1 w-fit mx-auto"
            >
                <div
                    className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-4 md:p-6 rounded-lg rounded-b-sm text-center"
                >
                    <h2
                        className="text-2xl font-bold"
                    >Cantidad de trueques</h2>
                    <h3
                        className="border border-gray-200 w-fit mx-auto px-3 py-1 rounded-sm mt-2"
                    >{trueques.length}</h3>
                </div>
                <div
                    className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg rounded-t-sm"
                >
                    {trueques.length ?
                        <TableContainer component={Paper} style={{backgroundColor: '#2D2D2D', color: 'white'}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{color: 'white'}}>Fecha</TableCell>
                                        <TableCell style={{color: 'white'}}>Codigo Trueque</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trueques.map((trueque) => (
                                        <TableRow
                                            key={trueque.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell
                                                style={{color: 'white'}}>{trueque.solicitud.meeting_date_time}</TableCell>
                                            <TableCell style={{color: 'white'}}>
                                                <Link
                                                    className='hover:underline'
                                                    href={route(
                                                        'trueque.show',
                                                        trueque.id
                                                    )}
                                                >
                                                    {trueque.code}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <h3 className="text-center text-3xl font-bold">
                            {emptyListMessage}
                        </h3>
                    }
                </div>
            </div>
        </StatisticsLayout>
    )
}
