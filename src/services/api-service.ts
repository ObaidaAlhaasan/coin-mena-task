import {ExternalUrlsConstants} from "./constants";
import {ICryptoAsset, ICryptoAssetResponse, ICryptoToCurrencyResponse} from "../types/cryptos";

const cryptoField = `&fields=id,slug,symbol,metrics/market_data/price_usd`;
export const fetchCryptos = async (page: number = 1, count: number = 10): Promise<ICryptoAssetResponse> => await fetch(`${ExternalUrlsConstants.CryptoAssets}?page=${page}&limit=${count}${cryptoField}`).then(r => r.json());

export const fetchCryptoToCurrency = async (crypto: ICryptoAsset | undefined, amt: string | undefined): Promise<ICryptoToCurrencyResponse> => {
  if (!crypto || !amt) {
    console.log("crypto", crypto, "amt", amt);
    return Promise.reject("Invalid argument value");
  }
  return await fetch(`${ExternalUrlsConstants.CryptoExchange}?from=${crypto.symbol}&to=USD&amount=${amt}`).then(r => r.json());
}

export const fetchCurrencyToCrypto = async (crypto: ICryptoAsset | undefined, amt: string | undefined): Promise<ICryptoToCurrencyResponse> => {
  if (!crypto || !amt) {
    console.log("crypto", crypto, "amt", amt);
    return Promise.reject("Invalid argument value");
  }
  return await fetch(`${ExternalUrlsConstants.CryptoExchange}?from=USD&to=${crypto.symbol}&amount=${amt}`).then(r => r.json());
}
