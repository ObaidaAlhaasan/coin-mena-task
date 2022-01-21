import {useQuery} from "react-query";
import {ICryptoAssetResponse, IPaginateCryptoParam} from "../types/cryptos";
import {fetchCryptos} from "../services/api-service";

export const usePaginatedCryptoAssets = ({queryPageIndex, queryPageItemsCount}:IPaginateCryptoParam) => {
  return useQuery<ICryptoAssetResponse>(["crypto-assets", queryPageIndex, queryPageItemsCount],
    () => fetchCryptos(queryPageIndex + 1, queryPageItemsCount), {keepPreviousData: true})
}
