import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const account = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (account.isConnected) {
      navigate({ to: "/discover" });
    } else if (account.isDisconnected) {
      navigate({ to: "/" });
    }
  }, [account, navigate]);

  return <Outlet />;
}
