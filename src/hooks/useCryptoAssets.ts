import {useQuery} from "react-query";
import {ICryptoAssetResponse} from "../types/cryptos";
import {fetchCryptos} from "../services/api-service";

export const useCryptoAssets = () => {
  return useQuery<ICryptoAssetResponse>(["crypto-assets"], () => fetchCryptos(1, 200), {
    keepPreviousData: true,
    refetchOnMount: false,
  })
}
