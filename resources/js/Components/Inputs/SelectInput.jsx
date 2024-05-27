import {forwardRef, useRef} from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default forwardRef(function SelectInput({className = '', children, invalid, valid, ...props}, ref) {
    const select = ref ? ref : useRef();

    let borderClasses = 'border-gray-300 dark:border-gray-700 focus:border-custom-teal-500' +
        ' dark:focus:border-custom-teal-600 focus:ring-custom-teal-500 dark:focus:ring-custom-teal-600'

    if(invalid){
        borderClasses = 'border-red-600 dark:border-red-400 focus:border-orange-900 dark:focus:border-orange-800' +
            ' focus:ring-orange-900 dark:focus:ring-orange-800'
    }
    else if (valid){
        borderClasses = 'border-green-600 dark:border-green-400 focus:border-green-900 dark:focus:border-green-800' +
            ' focus:ring-green-900 dark:focus:ring-green-800'
    }

    const icon = invalid ? <ErrorOutlineIcon className="absolute right-8 top-1/2 transform -translate-y-1/2  text-red-600"/> :
        valid ? <CheckCircleOutlineIcon className="absolute right-8 top-1/2 transform -translate-y-1/2  text-green-600"/> : null

    return (
        <div className="relative">
            <select
                {...props}
                className={
                    `rounded-md shadow-sm pr-14 truncate dark:bg-gray-900 dark:text-gray-300 ${borderClasses} ${className}`
                }
                ref={select}
            >
                {children}
            </select>
            {icon}
        </div>
    );
});
