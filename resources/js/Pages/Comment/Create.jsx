import {useForm} from "@inertiajs/react";
import TextAreaInput from "@/Components/Inputs/TextAreaInput.jsx";
import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";

export default function Create({productId, ...props}) {
    const {data, setData, errors, post, processing, reset} = useForm({
        text: ""
    })

    const onSubmit = e => {
        e.preventDefault()
        post(route('comment.store', productId), {
            onSuccess: () => {
                reset()
            },
            preserveScroll: true,
            preserveState: true
        })
    }

    return (
        <div
            {...props}
        >
            <form
                method="post"
                onSubmit={onSubmit}
                className="flex flex-col items-end"
            >
                <div className="w-full mb-4">
                    <InputLabel
                        htmlFor="comment_text"
                        value="Agregá un comentario"
                        className="!text-2xl"
                    />
                    <TextAreaInput
                        id="comment_text"
                        placeholder="Tu comentario"
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
                    Comentar
                </PrimaryButton>
            </form>
        </div>
    )
}
