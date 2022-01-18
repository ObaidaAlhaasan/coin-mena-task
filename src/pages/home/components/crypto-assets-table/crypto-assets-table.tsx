import React, {FC, useMemo, useState} from 'react';
import {useQuery} from "react-query";
import CryptoIconsService from "../../../../services/crypto-icons";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import "./crypto-assets-table.scss";
import MoneyFormatterService from "../../../../services/money-formatter";
import ReusableTable from "../../../../components/reusable-table/reusable-table";

interface ICryptoAssetsTable {

}

const fetchCryptos = async (page: number = 1, count: number = 10) => {
  console.log("page", page, "count", count);
  const fields = `&fields=id,slug,symbol,metrics/market_data/price_usd`;

  // const r = await fetch(`${ExternalUrlsConstants.CryptoAssets}?page=${page}&limit=${count}${fields}`).then(r => r.json());
  return await fetch("https://data.messari.io/api/v1/assets?page=1&limit=20&fields=id,slug,symbol,metrics/market_data/price_usd").then(r => r.json());
  // console.log(r);
  // return r;
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
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    data: response,
    status
  } = useQuery<ICryptoAssetResponse>(["crypto-assets", pageIndex, pageSize], () => fetchCryptos(pageIndex, pageSize), {keepPreviousData: true});
  const data = response?.data ?? [];

  const columns = useMemo<any>(
    () => [
      {
        Header: "",
        accessor: "symbol",
        Cell: (cell: { value: string }) => {
          return <CryptoIcon iconName={cell.value}/>;
        },
        className: 'crypto-icon-wrapper',
        width: 10,
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "slug",
        Cell: (cell: { value: string }) => {
          console.log(cell);
          return <>  <span className="text-capitalize ">{cell.value}</span> </>
        }
      },
      {
        Header: "Price",
        accessor: "metrics.market_data.price_usd",
        Cell: (cell: { value: string }) => {
          return <span className="">{MoneyFormatterService.Format(cell.value)}</span>
        }
      },
      {
        id: "symbol_id",
        Header: "ID",
        accessor: "symbol",
        Cell: (cell: { value: string }) => {
          console.log(cell);
          return <>  <span className="text-capitalize ">{cell.value}</span> </>
        },
        disableSortBy: true
      },
      {
        Header: "Trade",
        accessor: "",
        Cell: () => {
          return (
            <div className="">
              <button className="btn btn-primary btn-sm"> Buy</button>
              <button className="btn btn-primary btn-sm">Sell</button>
            </div>
          )
        },
        disableSortBy: true,
      }
    ]
    , []);

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>;

  return (
    <div className="crypto-assets-table row justify-content-center">
      <div className="col-8 table-responsive">
        <ReusableTable columns={columns} data={data}
                       pageIndex={pageIndex}
                       pageSize={pageSize}
                       totalItems={response?.status?.elapsed ?? 10}
                       nextPage={() => setPageIndex(pageIndex + 1)}
                       previousPage={() => setPageIndex(pageIndex - 1)}
                       goToPage={setPageIndex}
                       setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};
export default CryptoAssetsTable;
