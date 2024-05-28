import {useForm} from "@inertiajs/react";

export default function create({auth}) {
    const {} = useForm({
        product_id: '',
        meeting_date_time: '',
    });
    return ("Hola")
}
