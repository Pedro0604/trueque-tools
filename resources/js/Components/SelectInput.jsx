import {forwardRef, useRef} from 'react';

export default forwardRef(function SelectInput({className = '', children, ...props}, ref) {
    const select = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ' +
                ' focus:border-custom-teal-500 dark:focus:border-custom-teal-600 focus:ring-custom-teal-500 ' +
                ' dark:focus:ring-custom-teal-600 rounded-md shadow-sm ' +
                className
            }
            ref={select}
        >{children}</select>
    );
});
