import {CATEGORIES_TEXT_MAP} from "@/Categories.jsx";

export default function CategoryOptions() {
    return (
        <>
            <option value="1">{CATEGORIES_TEXT_MAP[1]}</option>
            <option value="2">{CATEGORIES_TEXT_MAP[2]}</option>
            <option value="3">{CATEGORIES_TEXT_MAP[3]}</option>
        </>
    )
}
