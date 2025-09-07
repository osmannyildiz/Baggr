import type { Bag } from "./types";

export const BAGS: Bag[] = [
  {
    id: "1",
    name: "Example Bag",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima explicabo dolore provident eum delectus.",
    imageUrl: "https://picsum.photos/id/1/800",
    tokenAmounts: [
      {
        amount: 0.7,
        token: { id: "1", name: "Token 1", color: "#0000ff" },
      },
      {
        amount: 0.3,
        token: { id: "2", name: "Token 2", color: "#00ff00" },
      },
    ],
  },
];
