import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
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

        <nav>
          <Link to="/create">Create</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </main>
    </>
  );
}
