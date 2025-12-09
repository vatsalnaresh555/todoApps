import type { Todo } from "@/types/todo";

type Props = {
  todos: Todo[];
  onToggle: (todo: Todo) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between border rounded px-3 py-2"
        >
          <label className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo)}
            />
            <span
              className={
                "break-words " +
                (todo.completed ? "line-through text-gray-500" : "")
              }
            >
              {todo.title}
            </span>
          </label>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-sm text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
