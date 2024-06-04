export default function Divisor({ vertical = false, className }) {
    if(vertical){
        return (
            <div className={`border-l border-gray-600 h-10 ${className}`}></div>
        )
    }
    return (
        <div className={`border-b border-gray-600 w-full ${className}`}></div>
    )
}
