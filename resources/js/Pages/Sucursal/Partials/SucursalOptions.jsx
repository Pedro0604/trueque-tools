import {usePage} from "@inertiajs/react";

export default function SucursalOptions() {
    const {sucursals} = usePage().props;

    return (
        <>
            {sucursals.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.name}
                </option>
            ))}
        </>
    )
}
