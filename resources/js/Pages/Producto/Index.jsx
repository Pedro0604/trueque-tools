import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link} from "@inertiajs/react";

export default function Index({auth, productos}) {
    if(auth.user) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="flex gap-3 justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Productos
                        </h2>
                        <Link
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                            href={route('producto.create')}
                        >
                            Add new
                        </Link>
                    </div>
                }
            >
                <Head title="Productos"/>
            </AuthenticatedLayout>
        )
    }
    return (
        <GuestLayout>
            <Head title="Productos"/>
        </GuestLayout>
    )
}
