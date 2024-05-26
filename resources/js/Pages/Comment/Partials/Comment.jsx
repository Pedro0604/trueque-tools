import {useForm, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Comment({
                                    comment,
                                    isResponse,
                                    className = "",
                                    productUserId = null,
                                    ...props
                                }) {
    const {auth} = usePage().props;

    const {data, setData, errors, post, processing, reset} = useForm({
        text: "",
    })
    const [isResponseFormOpen, setIsResponseFormOpen] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        post(route('comment.respond', comment.id), {
            onSuccess: () => {
                setIsResponseFormOpen(false)
                reset()
            },
            preserveScroll: true
        })
    }

    const handleClick = () => {
        setIsResponseFormOpen(prevValue => !prevValue)
    }

    const canBeResponded = !isResponse && !comment.response && auth.user && auth.user.id === productUserId;

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
                {canBeResponded &&
                    <div className={"mt-4"}>
                        <PrimaryButton
                            onClick={handleClick}
                        >
                            {isResponseFormOpen ? "X" : "Respondeme"}
                        </PrimaryButton>
                    </div>}
            </div>
            {isResponseFormOpen &&
                <form
                    method="post"
                    onSubmit={onSubmit}
                    className="flex flex-col items-end"
                >
                    <div className="w-full mb-4">
                        <InputLabel
                            htmlFor="comment_text"
                            value="Responde al comentario"
                            className="!text-2xl"
                        />
                        <TextAreaInput
                            id="comment_text"
                            placeholder="Tu respuesta"
                            name="text"
                            value={data.text}
                            onChange={e => {
                                setData('text', e.target.value)
                            }}
                            className="mt-1 block w-full"
                            invalid={errors.text}
                            rows={3}
                        />
                        <InputError message={errors.text}/>
                    </div>
                    <PrimaryButton className="justify-center h-10" disabled={processing}>
                        Responder
                    </PrimaryButton>
                </form>
            }
        </div>
    );
}
