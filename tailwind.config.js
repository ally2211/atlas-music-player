// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // Enable dark mode support
    theme: {
        extend: {
            colors: {
                darkBlue: "#0a1f3d",      // Custom dark blue
                warmYellow: "#f8c460",    // Highlight color
                softBlack: "#1a1a1a",
                paleWhite: "#fdfdfd",
                warmWhite: '#FAFAFA',

            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                xl: "1rem",
            },
            boxShadow: {
                custom: "0 8px 24px rgba(0, 0, 0, 0.15)",
            },
            borderColor: {
                warmYellow: "#f8c460",
            },
            screens: {
                'sm': '640px', // Small screens
                'md': '768px', // Medium screens
                'lg': '1024px', // Large screens
                'xl': '1280px', // Extra large screens
            },

        },
    },
    plugins: [],
};
