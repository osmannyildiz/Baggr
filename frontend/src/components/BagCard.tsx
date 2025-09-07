import { Pie } from "@nivo/pie";
import { useState } from "react";
import { TbSkull } from "react-icons/tb";
import TinderCard from "react-tinder-card";
import type { RespBag } from "../api/bags";
import type { RiskLevel } from "../types";
import cn from "../utils/classNamesHelper";

export type SwipeDirection = "left" | "right";

const MAX_PAGE_INDEX = 2;

const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  low: "var(--color-green-700)",
  medium: "var(--color-yellow-700)",
  high: "var(--color-red-700)",
};

const RISK_LEVEL_ICONS: Record<RiskLevel, React.ReactNode> = {
  low: <TbSkull size={48} />,
  medium: <TbSkull size={48} />,
  high: <TbSkull size={48} />,
};

const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface Props {
  bag: RespBag;
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

      <div className="absolute inset-0 z-20 flex w-full flex-col justify-end bg-linear-to-b from-transparent to-black p-4 text-white">
        {pageIndex === 0 && <BagCardSummaryPage bag={bag} />}
        {pageIndex === 1 && <BagCardTokensPage bag={bag} />}
        {pageIndex === 2 && <BagCardAnalysisPage bag={bag} />}

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

      <div className="absolute z-30 grid h-full w-full grid-cols-2">
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

function BagCardSummaryPage({ bag }: { bag: RespBag }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{bag.name}</h1>
      <p className="mt-1 text-sm">{bag.description}</p>
    </div>
  );
}

function BagCardTokensPage({ bag }: { bag: RespBag }) {
  return (
    <div className="flex justify-center">
      <Pie
        data={bag.tokenAmounts.map((tokenAmount) => ({
          id: tokenAmount.token.symbol,
          value: tokenAmount.percentage / 100,
          color: tokenAmount.token.color,
        }))}
        valueFormat={">-~p"}
        colors={{ datum: "data.color" }}
        height={400}
        width={320}
        margin={{ bottom: 64 }}
        enableArcLinkLabels={false}
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            translateY: 56,
            itemWidth: 100,
            itemHeight: 24,
          },
        ]}
        theme={{
          text: {
            fill: "white",
            outlineWidth: 1,
            outlineColor: "black",
            fontSize: 16,
          },
          legends: {
            text: {
              fill: "white",
              fontSize: 14,
            },
          },
        }}
        animate
      />
    </div>
  );
}

function BagCardAnalysisPage({ bag }: { bag: RespBag }) {
  return (
    <div>
      <div className="flex items-end gap-4">
        <div
          className="flex h-[64px] w-[64px] items-center justify-center rounded-full"
          style={{ backgroundColor: RISK_LEVEL_COLORS[bag.riskLevel] }}
        >
          {RISK_LEVEL_ICONS[bag.riskLevel]}
        </div>
        <div>
          <div className="text-sm">Risk Level</div>
          <div className="text-2xl font-semibold">
            {RISK_LEVEL_LABELS[bag.riskLevel]}
          </div>
        </div>
      </div>
    </div>
  );
}
