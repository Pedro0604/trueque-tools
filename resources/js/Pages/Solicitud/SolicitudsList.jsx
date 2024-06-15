import Solicitud from "@/Pages/Solicitud/Partials/Solicitud.jsx";

export default function SolicitudsList({solicituds, className, isAuthor = true, ...props}) {
    return (
        <div
            {...props}
            className={className}
        >
            {solicituds.length > 0 ? (
                <>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">
                        {isAuthor ? 'Solicitudes' : 'Tus solicitudes'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {solicituds.map((solicitud) => (
                            <>{
                                solicitud.can.view &&
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
        </div>
    );
}
