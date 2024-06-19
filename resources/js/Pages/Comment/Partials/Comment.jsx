import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ResponseForm from "@/Pages/Comment/Partials/ResponseForm.jsx";
import DangerButton from "@/Components/Buttons/DangerButton.jsx";
import { Link, router } from "@inertiajs/react";
import CyanButton from "@/Components/Buttons/CyanButton";
import UpdateForm from "./UpdateForm";

export default function Comment({
    comment,
    isResponse,
    className = "",
    productUserId = null,
    ...props
}) {
    const [isResponseFormOpen, setIsResponseFormOpen] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

    const handleClick = () => {
        setIsResponseFormOpen((prevValue) => !prevValue);
        setIsUpdateFormOpen(false);
    };

    const handleDelete = () => {
        router.delete(
            route("comment.destroy", comment.id, { preserveScroll: true })
        );
    };

    const handleUpdate = () => {
        setIsUpdateFormOpen((prevValue) => !prevValue);
        setIsResponseFormOpen(false);
    };

    return (
        <div
            {...props}
            className={`${
                isResponse ? "ml-10 mt-2" : ""
            } text-black dark:text-white bg-gray-400 dark:bg-gray-700 rounded-md p-4 relative ${className}`}
        >
            {isResponse && (
                <div className="absolute border-b border-l border-gray-500 dark:border-gray-300 w-4 h-4 -left-6 top-1"></div>
            )}
            <div className="flex items-center justify-between">
                <div className="font-semibold text-sm text-gray-600 dark:text-gray-500">
                    <Link
                        href={route("user.show", comment.user.id)}
                        className="hover:underline"
                    >
                        {comment.user.name}
                    </Link>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-500 ml-2">
                    {comment.created_at}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="mt-2 w-full">{comment.text}</div>
                <div className="flex gap-3">
                    {comment.can.respond && (
                        <div className={"mt-4"}>
                            <PrimaryButton onClick={handleClick}>
                                {isResponseFormOpen ? (
                                    <CloseIcon />
                                ) : (
                                    "Responder"
                                )}
                            </PrimaryButton>
                        </div>
                    )}
                    {comment.can.update && (
                        <div className={"mt-4"}>
                            <CyanButton onClick={handleUpdate}>
                                {isUpdateFormOpen ? <CloseIcon /> : "Modificar"}
                            </CyanButton>
                        </div>
                    )}
                    {comment.can.delete && (
                        <div className={"mt-4"}>
                            <DangerButton onClick={handleDelete}>
                                {"Eliminar"}
                            </DangerButton>
                        </div>
                    )}
                </div>
            </div>
            {isResponseFormOpen && (
                <ResponseForm
                    comment={comment}
                    onSuccess={() => setIsResponseFormOpen(false)}
                />
            )}
            {isUpdateFormOpen && (
                <UpdateForm
                    comment={comment}
                    onSuccess={() => setIsUpdateFormOpen(false)}
                />
            )}
        </div>
    );
}
