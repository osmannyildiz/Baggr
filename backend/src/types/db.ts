export interface DbToken {
  rowid: number;
  id: string;
  symbol: string;
  address: string;
  description: string;
  color: string;
  image_url: string;
  risk_level: string;
}

export interface DbBag {
  rowid: number;
  id: string;
  name: string;
  description: string;
  image_url: string;
  risk_level: string;
}

export interface DbBagToken {
  rowid: number;
  bag_rowid: number;
  token_rowid: number;
  percentage: number;
}
