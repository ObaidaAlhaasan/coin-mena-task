import React, {FC, useMemo, useState} from 'react';
import {useQuery} from "react-query";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import "./crypto-assets-table.scss";
import MoneyFormatterService from "../../../../services/money-formatter";
import ReusableTable from "../../../../components/reusable-table/reusable-table";
import ButtonDropdown from "../../../../components/drop-down/button-dropdown";
import {Row} from "react-table";
import Container from "../../../../components/container/container";
import {fetchCryptos} from "../../../../services/api-service";
import {CryptoIcon} from "../../../../components/crypto-icon/crypto-icon";
import {ICryptoAssetResponse} from "../../../../types/cryptos";

const CryptoAssetsTable: FC = () => {
  const [queryPageIndex, setPageIndex] = useState<number>(0);
  const [queryPageItemsCount, setPageItemsCount] = useState<number>(10);

  const {
    data: response,
    status
  } = useQuery<ICryptoAssetResponse>(["crypto-assets", queryPageIndex, queryPageItemsCount],
    () => fetchCryptos(queryPageIndex + 1, queryPageItemsCount), {keepPreviousData: true});
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
