import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header>
        <div className="text-center text-3xl font-bold">Baggr</div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center">&copy; 2025 Star Bros</footer>
    </>
  );
}
