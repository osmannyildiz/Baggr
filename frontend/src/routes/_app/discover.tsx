import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BagCardStack } from "../../components/BagCardStack";
import { BAGS } from "../../mockData";

export const Route = createFileRoute("/_app/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  const [bags, setBags] = useState(BAGS);

  return (
    <BagCardStack
      bags={bags}
      onSwipe={(bagId, direction) =>
        direction === "right"
          ? toast(`Liked bag ${bagId}`)
          : toast(`Disliked bag ${bagId}`)
      }
      onCardLeftScreen={(bagId) => {
        setBags(bags.filter((bag) => bag.id !== bagId));
      }}
    />
  );
}
