import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useBagsQuery } from "../../api/bags";
import { BagCardStack } from "../../components/BagCardStack";
import { BAGS } from "../../mockData";

export const Route = createFileRoute("/_app/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  const bagsQuery = useBagsQuery();

  const [bags, setBags] = useState(BAGS);

  if (bagsQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (bagsQuery.isError) {
    return <div>Error: {bagsQuery.error.message}</div>;
  }

  return (
    <BagCardStack
      bags={bagsQuery.data}
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
