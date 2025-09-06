import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { TbShoppingBagPlus, TbSwipe, TbUser } from "react-icons/tb";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col">
      <header className="py-2">
        <div className="text-center text-3xl font-semibold">Baggr</div>
      </header>

      <main className="grow">
        <Outlet />
      </main>

      <nav className="mt-4 flex h-[64px]">
        <Link
          to="/create"
          className="flex grow flex-col items-center justify-center"
        >
          <TbShoppingBagPlus size={32} />
          <span className="text-xs">Create</span>
        </Link>
        <Link
          to="/discover"
          className="relative flex grow flex-col items-center justify-center text-white"
        >
          <div className="absolute -top-4 right-4 bottom-0 left-4 -z-1 rounded-t-full bg-slate-700"></div>
          <TbSwipe size={40} className="-mt-3 mb-1" />
          <span className="text-xs">Discover</span>
        </Link>
        <Link
          to="/profile"
          className="flex grow flex-col items-center justify-center"
        >
          <TbUser size={32} />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
