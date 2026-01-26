import { useState, useEffect } from 'react';

export default function Footer() {
    const year = new Date().getFullYear();
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first, then HTML element
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                return saved === 'true';
            }
            return document.documentElement.classList.contains('dark');
        }
        return true; // Default to dark mode
    });

    useEffect(() => {
        // Sync with HTML element's class and localStorage whenever isDark changes
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(prev => {
            const newValue = !prev;
            // Immediately update DOM for instant feedback
            const htmlElement = document.documentElement;
            if (newValue) {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }
            return newValue;
        });
    };

    return (
        <div className="text-center p-8 flex flex-col items-center gap-4 text-softBlack dark:text-warmWhite">
            <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded-lg bg-warmYellow text-softBlack hover:bg-yellow-400 transition"
                aria-label="Toggle dark mode"
            >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <div>&copy; {year} Atlas School</div>
        </div>
    );
}
