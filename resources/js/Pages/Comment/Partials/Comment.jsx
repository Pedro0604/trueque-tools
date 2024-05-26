import {usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Comment({
                                    comment,
                                    isResponse,
                                    className = "",
                                    productUserId = null,
                                    ...props
                                }) {
    const {auth} = usePage().props;
    return (
        <div
            {...props}
            className={`${
                isResponse ? "ml-10 mt-2" : ""
            } text-black dark:text-white bg-gray-400 dark:bg-gray-700 rounded-md p-4 relative ${className}`}
        >
            {isResponse && <div
                className="absolute border-b border-l border-gray-500 dark:border-gray-300 w-4 h-4 -left-6 top-1"></div>}
            <div className="flex items-center justify-between">
                <div className="font-semibold text-sm text-gray-600 dark:text-gray-500">
                    {comment.user.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-500 ml-2">
                    {comment.created_at}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="mt-2">{comment.text}</div>
                <div className={(!isResponse && auth.user && auth.user.id === productUserId ? "" : "hidden") + " mt-4"}>
                    <PrimaryButton>Respondeme lcdll</PrimaryButton>
                </div>
            </div>
        </div>
    );
}
