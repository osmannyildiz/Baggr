import type { RiskLevel } from "../types";

export interface RespToken {
  id: string;
  symbol: string;
  address: string;
  description: string;
  color: string;
  imageUrl: string;
  riskLevel: RiskLevel;
}
