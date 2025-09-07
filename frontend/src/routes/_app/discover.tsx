import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useBagsQuery } from "../../api/bags";
import { BagCardStack } from "../../components/BagCardStack";

export const Route = createFileRoute("/_app/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  const bagsQuery = useBagsQuery();

  const [viewedBagIds, setViewedBagIds] = useState<string[]>([]);

  if (bagsQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (bagsQuery.isError) {
    return <div>Error: {bagsQuery.error.message}</div>;
  }

  return (
    <BagCardStack
      bags={bagsQuery.data?.data.filter(
        (bag) => !viewedBagIds.includes(bag.id),
      )}
      onSwipe={(bagId, direction) =>
        direction === "right"
          ? toast(`Liked bag ${bagId}`)
          : toast(`Disliked bag ${bagId}`)
      }
      onCardLeftScreen={(bagId) => {
        setViewedBagIds([...viewedBagIds, bagId]);
      }}
    />
  );
}
