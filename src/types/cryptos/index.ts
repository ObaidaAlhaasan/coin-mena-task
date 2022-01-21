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



interface ISrcSideBase {
  "time": Date,
  "asset": CryptoCurrency,
  "rate": number,
}

export interface ICryptoRateResponse {
  "time": Date,
  "asset_id_base": string,
  "asset_id_quote": CryptoCurrency,
  "rate": number,
  "src_side_base": ISrcSideBase[]
}

export enum CryptoCurrency {
  USD = "USD",
  EUR = "EUR"
}

export type strOrNum = string | number;
export type exchangeSrc = "Crypto" | "Currency";

export interface IPaginateCryptoParam {
  queryPageIndex: number;
  queryPageItemsCount: number
}
