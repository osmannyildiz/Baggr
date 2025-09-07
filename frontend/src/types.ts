export interface Bag {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tokenAmounts: { amount: number; token: Token }[];
  riskLevel: RiskLevel;
}

export interface Token {
  id: string;
  name: string;
  color: string;
}

export type RiskLevel = "low" | "medium" | "high";
