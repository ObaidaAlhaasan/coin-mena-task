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

const CryptoAssetsTable: FC<ICryptoAssetsTable> = () => {
  const {data, status} = useQuery("crypto-assets", fetchCryptos);
  console.log(data);

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>;

  return (
    <div>

    </div>
  );
};

export default CryptoAssetsTable;
