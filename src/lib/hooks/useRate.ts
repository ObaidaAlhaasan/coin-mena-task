import {CryptoCurrency, ICryptoAsset, ICryptoRateResponse} from "../../types/cryptos";
import {useQuery} from "react-query";
import {fetchCryptoRate} from "../../services/api-service";

export const useRate = (crypto: ICryptoAsset | undefined, currency: CryptoCurrency) => {
  return useQuery<ICryptoRateResponse>(["crypto-rate-in-currency", crypto, currency], () => fetchCryptoRate(crypto, currency), {
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });
}
