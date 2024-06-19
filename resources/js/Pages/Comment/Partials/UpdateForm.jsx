import InputLabel from "@/Components/Inputs/InputLabel.jsx";
import TextAreaInput from "@/Components/Inputs/TextAreaInput.jsx";
import InputError from "@/Components/Inputs/InputError.jsx";
import PrimaryButton from "@/Components/Buttons/PrimaryButton.jsx";
import { useForm } from "@inertiajs/react";

export default function UpdateForm({ comment, onSuccess }) {
    const { data, setData, errors, patch, processing, reset } = useForm({
        text: comment.text,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        patch(route("comment.update", comment.id), {
            onSuccess: () => {
                onSuccess();
                reset();
            },
            preserveScroll: true,
        });
    };
    return (
        <form
            method="post"
            onSubmit={onSubmit}
            className="flex flex-col items-end"
        >
            <div className="w-full mb-4">
                <InputLabel
                    htmlFor="comment_text"
                    value="Modificá el comentario"
                    className="!text-2xl"
                />
                <TextAreaInput
                    id="comment_text"
                    placeholder="Tu comentario"
                    name="text"
                    value={data.text}
                    onChange={(e) => {
                        setData("text", e.target.value);
                    }}
                    className="mt-1 block w-full"
                    invalid={errors.text}
                    rows={3}
                />
                <InputError message={errors.text} />
            </div>
            <PrimaryButton
                className="justify-center h-10"
                disabled={processing}
            >
                Modificar
            </PrimaryButton>
        </form>
    );
}
