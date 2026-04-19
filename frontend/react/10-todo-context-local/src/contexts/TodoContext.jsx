import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext({
    todos: [
        {
            id: 1,
            text: "Todo Message",
            completed: false,
        },
    ],
    addTodo: (test) => {},
    updateTodo: (id, updatedTodo) => {},
    deleteTodo: (id) => {},
    toggleIsCompleted: (id) => {},
});

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    const updateTodo = (id, text) => {
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleIsCompleted = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                updateTodo,
                deleteTodo,
                toggleIsCompleted,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
