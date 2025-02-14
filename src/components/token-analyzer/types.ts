export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  image?: string;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  createdAt?: string;
  riskStatus?: string;
  links?: {
    twitter?: string;
    website?: string;
  };
  symbolUsedBefore?: boolean;
  duplicateTokens?: any[];
  isLoading?: boolean;
  totalPercentageBundled?: number;
  bundledDataUnavailable?: boolean;
  heldPercentage?: number;
}

export interface URLParams {
  address?: string;
  creatorCA?: string;
  isValidPage: boolean;
}
