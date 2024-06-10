import UserLayout from "@/Layouts/UserLayout.jsx";
import {Head} from "@inertiajs/react";
import Solicitud from "@/Pages/Solicitud/Partials/Solicitud.jsx";

export default function MySolicituds({solicituds, isPublishedProductOwner}) {
    return (
        <UserLayout
            header={
                <div className="flex gap-3 justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {isPublishedProductOwner ? 'Mis solicitudes recibidas' : 'Mis solicitudes enviadas'}
                    </h2>
                </div>
            }
        >
            <Head
                title={isPublishedProductOwner ? 'Mis solicitudes recibidas' : 'Mis solicitudes enviadas'}
            />

            {solicituds.length > 0 ? (
                <div
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6
                                text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg"
                >
                    {solicituds.map((solicitud) => (
                        <div key={solicitud.id}>{
                            solicitud.canBeViewed &&
                            <Solicitud
                                solicitud={solicitud}
                                showBothProducts
                                showHoverOnProduct
                                redirectOnReject={isPublishedProductOwner ? route('solicitud.mySolicitudsReceived') : route('solicitud.mySolicitudsSent')}
                            />
                        }
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-2xl font-bold text-black dark:text-white text-center">
                    {isPublishedProductOwner ? 'No tenés solicitudes recibidas' : 'No hiciste ninguna solicitud de trueque'}
                </h2>
            )}
        </UserLayout>
    )
}
