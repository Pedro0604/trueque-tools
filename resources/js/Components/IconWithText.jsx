export default function IconWithText({icon, text, textSize = "text-base"}){
    return (
        <div
            className="flex items-center gap-1"
        >
            <span
                className="text-gray-200"
            >
                {icon}
            </span>
            <p className={`${textSize} text-gray-600 dark:text-custom-beige-600`}>
                {text}
            </p>
        </div>
    )
}
