import {ExternalUrlsConstants} from "./constants";
import {CryptoCurrency, ICryptoAsset, ICryptoAssetResponse, ICryptoRateResponse} from "../types/cryptos";
import {isNotNullOrEmpty} from "../utils/string-utils";

const cryptoField = `&fields=id,slug,symbol,metrics/market_data/price_usd`;
export const fetchCryptos = async (page: number = 1, count: number = 10): Promise<ICryptoAssetResponse> =>
  await fetch(`${ExternalUrlsConstants.CryptoAssets}?page=${page}&limit=${count}${cryptoField}`).then(r => r.json());


export const fetchCryptoRate = async (crypto: ICryptoAsset | undefined, currency: CryptoCurrency): Promise<ICryptoRateResponse> => {
  if (!crypto || !currency) {
    return Promise.reject("Invalid argument value");
  }

  const response = await fetch(`${ExternalUrlsConstants.CryptoRate}/${crypto.symbol}/${currency}?apiKey=${process.env.REACT_APP_API_KEY}`).then(r => r.json());

  if (isNotNullOrEmpty(response.error))
    return Promise.reject(response.error);

  return response;
}
