import "./App.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function AppContent() {
    const { isDark } = useTheme();

    return (
        <div
            className={`min-h-screen flex items-center justify-center bg-gray-100 p-4 ${isDark ? "dark" : ""}`}
        >
            <div className="space-y-4">
                <div className="flex justify-center">
                    <ThemeBtn />
                </div>
                <Card />
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
