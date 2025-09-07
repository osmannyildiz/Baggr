export interface RespToken {
  id: string;
  symbol: string;
  address: string;
  name: string;
  description: string;
  image_url: string;
  risk_level: string;
}

export interface RespBag {
  id: string;
  name: string;
  description: string;
  image_url: string;
  risk_level: string;
  tokenAmounts: {
    token: RespToken;
    percentage: number;
  }[];
}
