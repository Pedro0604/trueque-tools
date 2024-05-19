import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'custom-blue': {
                    100: '#E0E5F2',
                    200: '#B3C0DB',
                    300: '#859AC4',
                    400: '#5874AD',
                    500: '#2C3359',
                    600: '#262F51',
                    700: '#1B203C',
                    800: '#13182D',
                    900: '#0D1020',
                },
                'custom-gray': {
                    100: '#D9DBE0',
                    200: '#B3B6C0',
                    300: '#8C8F9F',
                    400: '#666A7F',
                    500: '#5A5D73',
                    600: '#494B5C',
                    700: '#373844',
                    800: '#262831',
                    900: '#13141B',
                },
                'custom-teal': {
                    100: '#E6F7F7',
                    200: '#C0EDED',
                    300: '#99E3E3',
                    400: '#73D9D9',
                    500: '#0A96A6',
                    600: '#087D8F',
                    700: '#055C66',
                    800: '#044650',
                    900: '#02303A',
                },
                'custom-cyan': {
                    100: '#D4F2F2',
                    200: '#A8E6E6',
                    300: '#7CDBDB',
                    400: '#51CFCF',
                    500: '#04BFBF',
                    600: '#03A6A6',
                    700: '#027D7D',
                    800: '#016464',
                    900: '#004040',
                },
                'custom-beige': {
                    100: '#fbf9f3', // Very light variation
                    200: '#f7f3e7', // Lighter variation
                    300: '#f2ebdf', // Base color
                    400: '#e6e0d2', // Slightly darker
                    500: '#d6d0c2', // Medium
                    600: '#b8b2a3', // Darker
                    700: '#9b9586', // Darker still
                    800: '#7f7970', // Quite dark
                    900: '#625e58', // Very dark
                },
            }
        },
    },

    plugins: [forms],
};
