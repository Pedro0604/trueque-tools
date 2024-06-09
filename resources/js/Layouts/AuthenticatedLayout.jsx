import {usePage} from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout.jsx";
import EmpleadoLayout from "@/Layouts/EmpleadoLayout.jsx";
import AdminLayout from "@/Layouts/AdminLayout.jsx";

export default function AuthenticatedLayout({header, children}) {
    const auth = usePage().props.auth
    if (auth.user) {
        return (
            <UserLayout
                header={header}
            >
                {children}
            </UserLayout>
        )
    }
    else if (auth.empleado){
        return (
            <EmpleadoLayout
                header={header}
            >
                {children}
            </EmpleadoLayout>
        )
    }
    else if (auth.admin){
        console.log(auth.admin.name)
        return (
            <AdminLayout
                header={header}
            >
                {children}
            </AdminLayout>
        )
    }else{
        return null;
    }
}
