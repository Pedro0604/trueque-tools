import StatisticsLayout from "@/Pages/Admin/Statistics/StatisticsLayout.jsx";
import UsersList from "@/Pages/User/Partials/UsersList.jsx";

export default function MostTruequesUsers({users}){
    return(
        <StatisticsLayout>
            <UsersList
                users={users}
                withCantTrueques
                emptyListMessage={"No hay usuarios con trueques"}
            />
        </StatisticsLayout>
    )
}
