import UserLayout from "@/Layouts/UserLayout.jsx";
import {Head} from "@inertiajs/react";
import Solicitud from "@/Pages/Solicitud/Partials/Solicitud.jsx";

export default function MySolicituds({solicituds, isAuthor = true}) {
    return (
        <UserLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Mis Solicitudes
                    </h2>
                </div>
            }
        >
            <Head title="Mis Solicitudes"/>

            {solicituds.length > 0 ? (
                <>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">
                        {isAuthor ? 'Solicitudes' : 'Tus solicitudes'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                        {solicituds.map((solicitud) => (
                            <>{
                                solicitud.canBeViewed &&
                                < div
                                    key={solicitud.id}
                                >
                                    < Solicitud
                                        solicitud={solicitud}
                                    />
                                </div>
                            }
                            </>
                        ))}
                    </div>
                </>
            ) : (
                <h2 className="text-2xl font-bold text-black dark:text-white text-center">
                    No hay solicitudes {isAuthor ? '' : 'tuyas para este producto'}
                </h2>
            )}
        </UserLayout>
    )
}
