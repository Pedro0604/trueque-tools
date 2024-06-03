import Solicitud from "@/Pages/Solicitud/Partials/Solicitud.jsx";

export default function SolicitudsList({solicituds, className, ...props}) {
    return (
        <div
            {...props}
            className={className}
        >
            {solicituds.length > 0 ? (
                <>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">
                        Solicitudes
                    </h2>
                    <div className="flex flex-col gap-4">
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
                    No hay solicitudes
                </h2>
            )}
        </div>
    );
}
