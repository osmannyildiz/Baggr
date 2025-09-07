import { RiskLevel } from ".";

export interface RespToken {
  id: string;
  symbol: string;
  address: string;
  name: string;
  description: string;
  color: string;
  imageUrl: string;
  riskLevel: RiskLevel;
}

export interface RespBag {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  riskLevel: string;
  tokenAmounts: {
    token: RespToken;
    percentage: number;
  }[];
}
