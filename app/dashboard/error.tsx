"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
