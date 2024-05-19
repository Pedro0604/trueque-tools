import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function TextInput({className = '', isFocused = false, children, ...props}, ref) {
    const textArea = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textArea.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ' +
                ' focus:border-custom-teal-500 dark:focus:border-custom-teal-600 focus:ring-custom-teal-500 ' +
                ' dark:focus:ring-custom-teal-600 rounded-md shadow-sm ' +
                className
            }
            ref={textArea}
        >{children}</textarea>
    );
});
