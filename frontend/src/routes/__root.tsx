import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <h1 className="text-3xl font-bold underline">Baggr</h1>
      <Outlet />
    </React.Fragment>
  );
}
