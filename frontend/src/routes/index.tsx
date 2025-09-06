import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
      recusandae, fugit, molestiae aliquid delectus ex quas ab reprehenderit
      hic, impedit iste ea sint adipisci? Dolore beatae saepe repellat enim
      iure!
    </div>
  );
}
