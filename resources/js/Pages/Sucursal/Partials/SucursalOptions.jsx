import {usePage} from "@inertiajs/react";

export default function SucursalOptions({except = null}) {
    const {sucursals} = usePage().props;

    return (
        <>
            {sucursals.map((sucursal) => (
                except === sucursal.id ? null :
                <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.name}
                </option>
            ))}
        </>
    )
}
