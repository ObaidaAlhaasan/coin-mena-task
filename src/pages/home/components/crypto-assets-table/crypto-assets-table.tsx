import "./crypto-assets-table.scss";
import React, {FC, useMemo, useState} from 'react';
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import MoneyFormatterService from "../../../../services/money-formatter";
import ReusableTable from "../../../../components/reusable-table/reusable-table";
import {usePaginatedCryptoAssets} from "../../../../hooks/usePaginatedCryptoAssets";
import {CryptoIcon} from "../../../../components/crypto-icon/crypto-icon";
import {Row} from "react-table";
import Col from "../../../../components/col/col";

const CryptoAssetsTable: FC = () => {
  const [queryPageIndex, setPageIndex] = useState<number>(0);
  const [queryPageItemsCount, setPageItemsCount] = useState<number>(10);

  const {data: response, status} = usePaginatedCryptoAssets({queryPageItemsCount, queryPageIndex})
  const data = response?.data ?? [];

  const columns = useMemo(() => [{
    Header: "", accessor: "symbol", Cell: (cell: { value: string }) => {
      return <CryptoIcon iconName={cell.value}/>;
    }, className: 'crypto-icon-wrapper', width: 10, disableSortBy: true,
  }, {
    Header: "Name",
    accessor: "slug",
    Cell: (cell: { value: string }) => <span className="text-capitalize ">{cell.value}</span>
  }, {
    Header: "Price",
    accessor: "metrics.market_data.price_usd",
    Cell: (cell: { value: string }) => <span className="">{MoneyFormatterService.Format(cell.value)}</span>
  }, {
    id: "symbol_id",
    Header: "ID",
    accessor: "symbol",
    Cell: (cell: { value: string }) => <span className="text-capitalize ">{cell.value}</span>,
    disableSortBy: true
  }, {
    id: "Trade", Header: "", accessor: "", Cell: () => {
      return (
        <div className="dropdown">
          <button className="btn dropdown-toggle btn-outline-secondary" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
            Trade
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button className="dropdown-item d-flex flex-column align-items-center justify-content-between gap-2">
              <span className="btn w-100 btn-sm btn-primary">Buy</span>
            </button>
            </li>
            <li>
              <button className="dropdown-item d-flex flex-column align-items-center justify-content-between gap-2">
                <span className="btn  w-100   btn-sm  btn-primary">Sell</span>
              </button>
            </li>
          </ul>
        </div>
      )
    }, disableSortBy: true
  }, {
    id: 'expander', isExpanded: true, Cell: ({row}: { row: Row, toggleRowExpanded: () => void }) => {
      return <span
        className="d-block w-3rem fn-size-2rem text-end has-hover-text-primary"
        {...row.getToggleRowExpandedProps({})}>
              {row.isExpanded ? <i className="fas fa-chevron-down d-block"/> :
                <i className="fas fa-chevron-right d-block"/>}
          </span>
    }
  }], []);

  if (status === "loading") return <LoadingSpinner/>

  if (status === "error") return <LoadingError title="Crypto Assets"/>;

  return (
    <section className="crypto-assets-table row justify-content-center w-100">
      <Col md={8} className="table-responsive">
        <ReusableTable columns={columns}
                       data={data}
                       queryPageIndex={queryPageIndex}
                       queryPageSize={queryPageItemsCount}
                       totalCount={response?.status?.elapsed ?? 10}
                       setPageIndex={setPageIndex}
                       setPageItemsCount={setPageItemsCount}
        />
      </Col>
    </section>
  );
};
export default CryptoAssetsTable;
