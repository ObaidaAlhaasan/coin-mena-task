import React, {FC, useMemo, useState} from 'react';
import {useQuery} from "react-query";
import CryptoIconsService from "../../../../services/crypto-icons";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import "./crypto-assets-table.scss";
import MoneyFormatterService from "../../../../services/money-formatter";
import ReusableTable from "../../../../components/reusable-table/reusable-table";
import {ExternalUrlsConstants} from "../../../../services/constants";
import ButtonDropdown from "../../../../components/drop-down/button-dropdown";
import {Row} from "react-table";
import Container from "../../../../components/container/container";

interface ICryptoAssetsTable {

}

const cryptoField = `&fields=id,slug,symbol,metrics/market_data/price_usd`;
const fetchCryptos = async (page: number = 1, count: number = 10) => await fetch(`${ExternalUrlsConstants.CryptoAssets}?page=${page}&limit=${count}${cryptoField}`).then(r => r.json());

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
  const [queryPageIndex, setPageIndex] = useState<number>(0);
  const [queryPageItemsCount, setPageItemsCount] = useState<number>(10);

  const {
    data: response,
    status
  } = useQuery<ICryptoAssetResponse>(["crypto-assets", queryPageIndex, queryPageItemsCount], () => fetchCryptos(queryPageIndex + 1, queryPageItemsCount), {keepPreviousData: true});
  const data = response?.data ?? [];

  const columns = useMemo(
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
        Cell: (cell: { value: string }) => <span className="text-capitalize ">{cell.value}</span>
      },
      {
        Header: "Price",
        accessor: "metrics.market_data.price_usd",
        Cell: (cell: { value: string }) => <span className="">{MoneyFormatterService.Format(cell.value)}</span>
      },
      {
        id: "symbol_id",
        Header: "ID",
        accessor: "symbol",
        Cell: (cell: { value: string }) => <span className="text-capitalize ">{cell.value}</span>,
        disableSortBy: true
      },
      {
        id: "Trade",
        Header: "",
        accessor: "",
        Cell: () => {
          return (
            <ButtonDropdown label="Trade" className="btn btn-outline-secondary d-flex align-items-center w-7rem"
                            items={[<button className="btn btn-primary w-7rem"> Buy</button>,
                              <button className="btn btn-primary w-7rem">Sell</button>]}
            >
            </ButtonDropdown>
          )
        },
        disableSortBy: true
      },
      {
        id: 'expander',
        isExpanded: true,
        Cell: ({row, toggleRowExpanded}: { row: Row, toggleRowExpanded: () => void }) => {
          return <span
            className="d-block w-3rem fn-size-2rem text-end has-hover-text-primary"
            {...row.getToggleRowExpandedProps({})}>
              {row.isExpanded ? <i className="fas fa-chevron-down d-block"/> :
                <i className="fas fa-chevron-right d-block"/>}
          </span>
        }
      }
    ]
    , []);

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>;

  return (
    <Container>
      <div className="crypto-assets-table row justify-content-center">
        <div className="col-8 table-responsive">
          <ReusableTable columns={columns}
                         data={data}
                         queryPageIndex={queryPageIndex}
                         queryPageSize={queryPageItemsCount}
                         totalCount={response?.status?.elapsed ?? 10}
                         setPageIndex={setPageIndex}
                         setPageItemsCount={setPageItemsCount}
          />
        </div>
      </div>
    </Container>
  );
};
export default CryptoAssetsTable;
