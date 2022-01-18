import React, {FC, useState} from 'react';
import {useQuery} from "react-query";
import {ExternalUrlsConstants} from "../../../../services/constants";
import CryptoIconsService from "../../../../services/crypto-icons";

interface ICryptoAssetsTable {

}

const fetchCryptos = async (page: number = 1, count: number = 10) => {
  return await fetch(`${ExternalUrlsConstants.CryptoAssets}`).then(r => r.json());
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


const CryptoIcon: FC<{ iconName: string }> = (props) => {

  const path = CryptoIconsService.AvailableIconsPaths[props.iconName.toLowerCase()] ?? CryptoIconsService.GenericIconPath;
  return <img src={path} alt="crypto icon"/>;
}

const CryptoAssetsTable: FC<ICryptoAssetsTable> = () => {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(10);
  const {
    data: response,
    status
  } = useQuery<ICryptoAssetResponse>(["crypto-assets", page, count], () => fetchCryptos(page, count), {keepPreviousData: true});

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>;

  return (
    <div>
      {response?.data?.map(c => {
        return <li key={c.symbol}>
          <CryptoIcon iconName={c.symbol}/>
          <span>name : {c.slug}</span>
          <span>price : {c.metrics.market_data.price_usd}</span>
          <span>symbol : {c.symbol}</span>
        </li>
      })}
    </div>
  );
};

export default CryptoAssetsTable;
