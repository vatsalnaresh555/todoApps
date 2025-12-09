import TodoApp from "@/components/TodoApp";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        <TodoApp />
      </div>
    </main>
  );
}
