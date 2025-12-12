// import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        'node_modules/preline/dist/*.js',

    ],
    darkMode: ["class"],
    important: true,
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "1rem",
                md: "1rem",
                lg: "1rem",
                xl: "3rem",
                '2xl': '8rem',
            },
        },

        fontFamily: {
            dm: ['"DM Sans", sans-serif'],
        },

        extend: {
            colors: {
                primary: "#FF6B35",
                primaryDark: "#E85A2B",
                secondary: "#191A15",
                dark: "#212121",
                light: "#747474",
                black: "#000000",
                muted: "#707070",
            },

            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                }
            },

            spacing: {
                0.75: "0.1875rem",
                3.25: "0.8125rem",
            },

            zIndex: {
                1: "1",
                2: "2",
                3: "3",
                999: "999",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('preline/plugin')
    ],
}
