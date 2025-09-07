import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div
        className="absolute inset-0 -z-1"
        style={{
          background: "white",
          backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      <header className="py-2">
        <div className="text-center text-3xl font-bold">Baggr</div>
      </header>

      <main className="flex grow flex-col justify-center gap-6 px-4 text-center">
        <div className="text-4xl font-extrabold">
          Where degens fall in love with their next bags.
        </div>

        <p className="text-lg font-medium">
          Swipe through curated token bundles like it's Tinder, stack them like
          it's Vegas.
        </p>

        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </main>

      <footer className="text-center">&copy; 2025 Star Bros</footer>
    </div>
  );
}
