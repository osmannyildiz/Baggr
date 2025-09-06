import type { Bag } from "../types";
import { BagCard } from "./BagCard";

interface Props {
  bags: Bag[];
}

export function BagCardStack({ bags }: Props) {
  return (
    <div className="h-full px-4 pb-2">
      {bags.map((bag) => (
        <BagCard key={bag.id} bag={bag} />
      ))}
    </div>
  );
}
