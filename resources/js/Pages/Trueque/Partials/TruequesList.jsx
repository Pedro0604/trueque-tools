import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";

export default function TruequesList({
                                         trueques,
                                         truequeCreatedId,
                                         emptyListMessage = "No hay trueques realizados",
                                         blurIfPaused = false
                                     }) {
    return (
        <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
            {trueques.length > 0 ?
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    {trueques.map(trueque => (
                        <Trueque
                            key={trueque.id}
                            ended={truequeCreatedId === trueque.id}
                            trueque={trueque}
                            blurIfPaused={blurIfPaused}
                        />))}
                </div>
                : <>
                    <h3 className="text-center text-3xl font-bold">
                        {emptyListMessage}
                    </h3>
                </>
            }
        </div>
    )
}
