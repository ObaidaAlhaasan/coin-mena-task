export interface ICryptoAsset {
  id: string;
  slug: string;
  symbol: string;
  metrics: {
    market_data: {
      price_usd: number;
    };
  };
}

export interface ICryptoAssetResponse {
  data: Array<ICryptoAsset>;
  status: {
    elapsed: number;
    timestamp: Date | string;
  };
}

export interface ICryptoToCurrencyResponse {
  "motd": {
    "msg": string,
    "url": string
  },
  "success": boolean,
  "query": {
    "from": string,
    "to": string,
    "amount": number
  },
  "info": {
    "rate": number
  },
  "historical": boolean,
  "date": Date,
  "result": number;
}
