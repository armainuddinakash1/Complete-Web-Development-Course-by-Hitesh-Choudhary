import { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
    const { updateTodo, deleteTodo, toggleIsCompleted } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.text);

    const editTodo = () => {
        updateTodo(todo.id, todoMsg);
        setIsTodoEditable(false);
    };

    const toggleComplete = () => {
        toggleIsCompleted(todo.id);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-3 shadow-sm shadow-white/50 text-white bg-[#ccbed7] ${
                todo.completed ? "bg-[#cccccc]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleComplete}
                disabled={isTodoEditable}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable
                        ? "border-black/20 px-2 py-1"
                        : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm bg-yellow-500 hover:bg-yellow-600 border border-black/10 justify-center items-center shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm bg-red-500 hover:bg-red-600 border border-black/10 justify-center items-center shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
