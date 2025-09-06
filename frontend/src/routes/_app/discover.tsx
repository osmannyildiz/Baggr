import { createFileRoute } from "@tanstack/react-router";
import { BagCardStack } from "../../components/BagCardStack";
import { BAGS } from "../../mockData";

export const Route = createFileRoute("/_app/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BagCardStack bags={BAGS} />;
}
