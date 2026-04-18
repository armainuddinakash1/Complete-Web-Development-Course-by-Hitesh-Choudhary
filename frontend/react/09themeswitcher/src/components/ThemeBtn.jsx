import { useTheme } from "../context/ThemeContext";

function ThemeBtn() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none   dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
        >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-sm">
                {isDark ? "🌙" : "☀️"}
            </span>
            {isDark ? "Dark mode" : "Light mode"}
        </button>
    );
}

export default ThemeBtn;
