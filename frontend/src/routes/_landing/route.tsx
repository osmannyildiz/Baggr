import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
