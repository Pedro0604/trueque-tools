import StatisticsLayout from "@/Pages/Admin/Statistics/StatisticsLayout.jsx";
import TruequesList from "@/Pages/Trueque/Partials/TruequesList.jsx";
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
                className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg max-w-5xl mx-auto"
            >
                {trueques.length ?
                    <TableContainer component={Paper} style={{backgroundColor: '#2D2D2D', color: 'white'}}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{color: 'white'}}>Codigo Trueque</TableCell>
                                    <TableCell align="center" style={{color: 'white'}}>Fecha</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trueques.map((trueque, index) => (
                                    <TableRow
                                        key={trueque.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align="center" style={{color: 'white'}}>
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
                                        <TableCell align="center" style={{color: 'white'}}>{trueque.solicitud.meeting_date_time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <h3 className="text-center text-3xl font-bold">
                        No hay trueques entre estas fechas
                    </h3>
                }
            </div>
        </StatisticsLayout>
    )
}
