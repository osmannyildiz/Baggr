import { useState } from "react";
import type { Bag } from "../types";
import cn from "../utils/classNamesHelper";

const MAX_PAGE_INDEX = 2;

interface Props {
  bag: Bag;
}

export function BagCard({ bag }: Props) {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className="relative h-full overflow-hidden rounded-xl shadow-xl">
      <div
        className="absolute h-full w-full"
        style={{ background: `url('${bag.imageUrl}')` }}
      ></div>

      <div className="absolute bottom-0 z-10 flex w-full flex-col bg-linear-to-b from-transparent to-black/80 p-4 pt-12 text-white">
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
        <div onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}></div>
        <div
          onClick={() => setPageIndex(Math.min(pageIndex + 1, MAX_PAGE_INDEX))}
        ></div>
      </div>
    </div>
  );
}

function BagCardSummaryPage({ bag }: Props) {
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
