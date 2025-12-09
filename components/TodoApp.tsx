"use client";

import React, { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
        alert("Error loading todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async (title: string) => {
    if (!title.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!res.ok) throw new Error("Failed to create todo");

      const created = (await res.json()) as Todo;
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Error creating todo");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = (await res.json()) as Todo;

      setTodos((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm("Delete this todo?")) return;

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 204) {
        throw new Error("Failed to delete");
      }

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting todo");
    }
  };

  return (
    <>
      <TodoForm onCreate={handleCreateTodo} creating={creating} />

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500">No todos yet. Add one!</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      )}
    </>
  );
}
