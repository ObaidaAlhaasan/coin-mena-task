import React, {FC} from 'react';
import {useQuery} from "react-query";
import {ExternalUrlsConstants} from "../../../../services/constants";
import {stat} from "fs";

interface ICryptoAssetsTable {

}

const fetchCryptos = async () => {
  return await fetch(ExternalUrlsConstants.CryptoAssets).then(r => r.json());
}

function LoadingSpinner() {
  return <h3>Loading....</h3>;
}

function LoadingError(props: { title: string }) {
  return <h3>Ops, something went wrong, failed to load {props.title} please try again later</h3>;
}

interface ICryptoAsset {
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

const CryptoAssetsTable: FC<ICryptoAssetsTable> = () => {
  const {data: response, status} = useQuery<ICryptoAssetResponse>("crypto-assets", fetchCryptos);

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>;

  return (
    <div>
      {response?.data?.map(c => <li>
        <span>name : {c.slug}</span>
        <span>price : {c.metrics.market_data.price_usd}</span>
        <span>symbol : {c.symbol}</span>
      </li>)}
    </div>
  );
};

export default CryptoAssetsTable;
