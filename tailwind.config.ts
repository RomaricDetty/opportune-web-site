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

            borderRadius: {
                sm: "0.5rem",
                md: "0.75rem",
                lg: "1rem",
            },

            boxShadow: {
                soft: "0 8px 24px rgba(25, 26, 21, 0.06)",
            },

            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'cart-bounce': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '30%': { transform: 'scale(1.25)' },
                    '55%': { transform: 'scale(0.92)' },
                    '75%': { transform: 'scale(1.08)' },
                },
                'heart-pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '40%': { transform: 'scale(1.35)' },
                    '70%': { transform: 'scale(0.95)' },
                },
                'toast-in': {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'toast-progress': {
                    '0%': { transform: 'scaleX(1)' },
                    '100%': { transform: 'scaleX(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'ken-burns': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.06)' },
                },
                'page-fade': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'reveal-up': {
                    '0%': { opacity: '0', transform: 'translateY(18px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'cart-bounce': 'cart-bounce 0.55s ease',
                'heart-pulse': 'heart-pulse 0.45s ease',
                'toast-in': 'toast-in 0.28s ease-out',
                'toast-progress': 'toast-progress linear forwards',
                shimmer: 'shimmer 1.4s ease-in-out infinite',
                'ken-burns': 'ken-burns 8s ease-out forwards',
                'page-fade': 'page-fade 0.35s ease-out',
                'reveal-up': 'reveal-up 0.55s ease-out both',
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
