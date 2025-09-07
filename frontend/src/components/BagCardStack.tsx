import { TbDeviceUnknown } from "react-icons/tb";
import type { Bag } from "../types";
import { BagCard, type SwipeDirection } from "./BagCard";

interface Props {
  bags: Bag[];
  onSwipe: (bagId: string, direction: SwipeDirection) => void;
  onCardLeftScreen: (bagId: string, direction: SwipeDirection) => void;
}

export function BagCardStack({ bags, onSwipe, onCardLeftScreen }: Props) {
  return (
    <div className="relative h-full px-4 pb-2">
      <div className="absolute inset-0 flex items-center justify-center">
        <TbDeviceUnknown size={128} />
      </div>

      {bags.map((bag) => (
        <BagCard
          key={bag.id}
          bag={bag}
          onSwipe={(direction) => onSwipe(bag.id, direction)}
          onCardLeftScreen={(direction) => onCardLeftScreen(bag.id, direction)}
        />
      ))}
    </div>
  );
}
