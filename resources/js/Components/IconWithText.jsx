export default function IconWithText({icon, text, textSize = "text-sm sm:text-base", textColor = "text-gray-600 dark:text-custom-beige-600"}){
    return (
        <div
            className="flex items-center gap-1"
        >
            <span
                className="text-gray-200"
            >
                {icon}
            </span>
            <p className={`${textSize} ${textColor}`}>
                {text}
            </p>
        </div>
    )
}
