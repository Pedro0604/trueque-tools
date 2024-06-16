import StatisticsLayout from "@/Pages/Admin/Statistics/StatisticsLayout.jsx";
import {router, usePage} from "@inertiajs/react";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextInput from "@/Components/Inputs/TextInput.jsx";
import VentasList from "@/Pages/Venta/Partials/VentasList.jsx";

export default function VentasBetweenDates({ventas}) {
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
            <VentasList
                ventas={ventas}
                emptyListMessage={emptyListMessage}
            />
        </StatisticsLayout>
    )
}
