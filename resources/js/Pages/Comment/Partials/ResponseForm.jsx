import InputLabel from "@/Components/InputLabel.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useForm} from "@inertiajs/react";

export default function ResponseForm({comment, onSuccess}) {
    const {data, setData, errors, post, processing, reset} = useForm({
        text: "",
    })

    const onSubmit = e => {
        e.preventDefault()
        post(route('comment.respond', comment.id), {
            onSuccess: () => {
                onSuccess()
                reset()
            },
            preserveScroll: true
        })
    }
    return (
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
    )
}
