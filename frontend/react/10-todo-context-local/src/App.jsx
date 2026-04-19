import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItems } from "./components";

function AppContent() {
    return (
        <div className="min-h-screen py-8 bg-linear-to-br from-[#2d3436] to-[#636e72]">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-[#2d3436]">
                <h1 className="text-2xl font-bold text-center text-white mb-8 mt-3">
                    Manage Your Todos
                </h1>
                <TodoForm />
                <TodoItems />
            </div>
        </div>
    );
}

function App() {
    return (
        <TodoProvider>
            <AppContent />
        </TodoProvider>
    );
}

export default App;
