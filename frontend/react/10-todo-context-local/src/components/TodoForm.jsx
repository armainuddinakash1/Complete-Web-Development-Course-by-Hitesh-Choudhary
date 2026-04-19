import { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    const [input, setInput] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        addTodo(input);
        setInput("");
    };

    return (
        <form onSubmit={add} className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="Write todo..."
                className="w-full px-3 py-2 rounded-lg bg-white/20 outline-none border border-black/10 placeholder-white text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-lg bg-green-600 px-3 py-2 text-white shrink-0 hover:bg-green-700"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
