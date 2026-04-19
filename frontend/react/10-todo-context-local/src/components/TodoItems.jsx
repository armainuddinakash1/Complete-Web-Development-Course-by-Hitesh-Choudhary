import { useTodo } from "../contexts";
import TodoItem from "./TodoItem";

function TodoItems() {
    const { todos } = useTodo();

    return (
        <div className="flex flex-wrap gap-y-2">
            {todos &&
                todos.map((todo) => (
                    <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                    </div>
                ))}
        </div>
    );
}

export default TodoItems;
