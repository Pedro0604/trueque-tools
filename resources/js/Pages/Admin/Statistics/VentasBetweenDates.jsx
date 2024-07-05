import StatisticsLayout from "@/Pages/Admin/Statistics/StatisticsLayout.jsx";
import {router, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import VentasList from "@/Pages/Venta/Partials/VentasList.jsx";
import {LineChart} from "@mui/x-charts";

export default function VentasBetweenDates({ventas, chartVentas, totalPriceSum}) {
    const queryParams = Object.assign({}, usePage().props.queryParams);

    const searchFieldChanged = (field, value) => {
        if (value) {
            queryParams[field] = value;
        } else {
            delete queryParams[field];
        }

        router.get(route('admin.statistics.ventasBetweenDates', queryParams));
    }

    const emptyListMessage = `No hay ventas cargadas en el sistema ${queryParams.start_date && queryParams.end_date ? 'para las fechas seleccionadas' : ''}`;

    const xLabels = chartVentas.map((venta) => venta.created_at.split('T')[0]);
    const seriesData = chartVentas.map((venta) => venta.total);

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
                    className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-4 md:p-6 rounded-lg rounded-b-sm text-center flex justify-evenly"
                >
                    <div>
                        <h2
                            className="text-2xl font-bold"
                        >Cantidad de ventas</h2>
                        <h3
                            className="border border-gray-200 w-fit mx-auto px-3 py-1 rounded-sm mt-2"
                        >{ventas.length}</h3>
                    </div>
                    <div>
                        <h2
                            className="text-2xl font-bold"
                        >
                            Dinero total recaudado
                        </h2>
                        <h3
                            className="border border-gray-200 w-fit mx-auto px-3 py-1 rounded-sm mt-2"
                        >${totalPriceSum}</h3>
                    </div>
                </div>
                {ventas.length > 0 &&
                    <div
                        className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-4 md:p-6 rounded-lg rounded-b-sm text-center"
                    >
                        <LineChart
                            width={1000}
                            height={500}
                            series={[
                                {
                                    data: seriesData,
                                    label: 'Cantidad de ventas',
                                },
                            ]}
                            xAxis={[{scaleType: 'point', data: xLabels}]}
                        />
                    </div>
                }
                <VentasList
                    ventas={ventas}
                    emptyListMessage={emptyListMessage}
                />
            </div>
        </StatisticsLayout>
    )
}
