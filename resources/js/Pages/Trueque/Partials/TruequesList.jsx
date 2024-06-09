import Trueque from "@/Pages/Trueque/Partials/Trueque.jsx";

export default function TruequesList({
                                         trueques,
                                         emptyListMessage = "No hay trueques realizados",
                                     }) {
    return (
        <div className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg">
            {trueques.length > 0 ?
                <div
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {trueques.map(trueque => (
                        <Trueque
                            key={trueque.id}
                            trueque={trueque}
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
