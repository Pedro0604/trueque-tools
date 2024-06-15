import User from "@/Pages/User/Partials/User.jsx";

export default function UsersList({
                                      users,
                                      withCantTrueques = false,
                                      emptyListMessage = "No hay usuarios cargados",
                                  }) {
    return (
        <div
            className="text-black dark:text-white bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg"
        >
            {users.length ?
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-8 gap-6">
                    {users.map(user => (
                        <User
                            key={user.id}
                            user={user}
                            withCantTrueques={withCantTrueques}
                        />
                    ))}
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
