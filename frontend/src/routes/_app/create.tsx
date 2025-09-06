import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Create</div>;
}
