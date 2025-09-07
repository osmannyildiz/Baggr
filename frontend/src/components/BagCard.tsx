import { useState } from "react";
import TinderCard from "react-tinder-card";
import type { Bag } from "../types";
import cn from "../utils/classNamesHelper";

export type SwipeDirection = "left" | "right";

const MAX_PAGE_INDEX = 2;

interface Props {
  bag: Bag;
  onSwipe: (direction: SwipeDirection) => void;
  onCardLeftScreen: (direction: SwipeDirection) => void;
}

export function BagCard({ bag, onSwipe, onCardLeftScreen }: Props) {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <TinderCard
      onSwipe={(direction) => onSwipe(direction as SwipeDirection)}
      onCardLeftScreen={(direction) =>
        onCardLeftScreen(direction as SwipeDirection)
      }
      preventSwipe={["up", "down"]}
      className="relative z-10 h-full overflow-hidden rounded-xl shadow-xl"
    >
      <div
        className="absolute h-full w-full"
        style={{ background: `url('${bag.imageUrl}') #ddd` }}
      ></div>

      <div className="absolute bottom-0 z-20 flex w-full flex-col bg-linear-to-b from-transparent to-black/80 p-4 pt-12 text-white">
        {pageIndex === 0 && <BagCardSummaryPage bag={bag} />}
        {pageIndex === 1 && <BagCardTokensPage />}
        {pageIndex === 2 && <BagCardAnalysisPage />}

        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: MAX_PAGE_INDEX + 1 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full border-2",
                pageIndex === index && "bg-white",
              )}
            ></div>
          ))}
        </div>
      </div>

      <div className="absolute grid h-full w-full grid-cols-2">
        <div
          className="pressable"
          onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
        ></div>
        <div
          className="pressable"
          onClick={() => setPageIndex(Math.min(pageIndex + 1, MAX_PAGE_INDEX))}
        ></div>
      </div>
    </TinderCard>
  );
}

function BagCardSummaryPage({ bag }: { bag: Bag }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{bag.name}</h1>
      <p className="mt-1 text-sm">{bag.description}</p>
    </div>
  );
}

function BagCardTokensPage() {
  return <div>Tokens</div>;
}

function BagCardAnalysisPage() {
  return <div>Analysis</div>;
}
