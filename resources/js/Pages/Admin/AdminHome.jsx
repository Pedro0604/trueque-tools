import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";

export default function AdminHome() {
    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin</h2>}
        >
            <Head title="Admin home" />
        </AdminLayout>
    );
}
