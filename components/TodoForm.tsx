import React, { useState } from "react";

type Props = {
  onCreate: (title: string) => Promise<void> | void;
  creating: boolean;
};

export default function TodoForm({ onCreate, creating }: Props) {
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await onCreate(newTitle);
    setNewTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={creating}
        className="border rounded px-4 py-2"
      >
        {creating ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
