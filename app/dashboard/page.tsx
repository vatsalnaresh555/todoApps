// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Simulate a slow async operation (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return <h1>Dashboard Loaded</h1>;
}

/*
export default async function DashboardPage() {
  throw new Error("Something exploded 💥");
}
*/