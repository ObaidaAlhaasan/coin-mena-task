import React, {FC, useMemo, useState} from 'react';
import {useQuery} from "react-query";
import {ExternalUrlsConstants} from "../../../../services/constants";
import CryptoIconsService from "../../../../services/crypto-icons";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import {usePagination, useSortBy, useTable} from "react-table";
import "./crypto-assets-table.scss";
import MoneyFormatterService from "../../../../services/money-formatter";

interface ICryptoAssetsTable {

}

const fetchCryptos = async (page: number = 1, count: number = 10) => {
  return await fetch(`${ExternalUrlsConstants.CryptoAssets}`).then(r => r.json());
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
          return <>  <span className="text-capitalize pt-2">{cell.value}</span> </>
        }
      },
      {
        Header: "Price",
        accessor: "metrics.market_data.price_usd",
        Cell: (cell: { value: string }) => {
          return <span className="pt-2">{MoneyFormatterService.Format(cell.value)}</span>
        }
      },
      {
        Header: "Trade",
        accessor: "",
        Cell: () => {
          return (
            <div className="pt-2">
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
        <Table columns={columns} data={data}/>
      </div>
    </div>
  );
};

interface ITableProps {
  columns: any[];
  data: any[]
}

const Table: FC<ITableProps> = ({columns, data}) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize}
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 1},
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <br/>

      <table {...getTableProps()} className="table table-light table-hover">
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div className="d-flex align-items-center">
                  <span>{column.render('Header')}</span>
                  <span className="d-inline-block mx-2 ">
                  {column.isSorted ?
                    column.isSortedDesc
                      ? <i className="fas fa-angle-up "/>
                      : <i className="fas fa-angle-down "/>
                    :
                    ''
                  }
              </span>
                </div>
              </th>
            ))}
          </tr>
        ))}

        </thead>

        <tbody {...getTableBodyProps()}>

        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>

      <div className="pagination d-flex align-items-center justify-content-between">
        <div>
          <div className="btn-group mx-1">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>
              <i className="fas fa-angle-double-left"/>
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
              <i className="fas fa-angle-left"/>
            </button>
          </div>

          <div className="btn-group mx-1">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => nextPage()} disabled={!canNextPage}>
              <i className="fas fa-angle-right"/>
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>
              <i className="fas fa-angle-double-right"/>
            </button>
          </div>
        </div>
        <span className="">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>

        <div className="mx-3 d-flex align-items-center">
          <span>Rows Per Page: </span>
          <select className="form-control-sm" id="rows-per-page">
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize} onChange={e => {
                setPageSize(pageSize)
              }}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

      </div>
    </>
  )
}
export default CryptoAssetsTable;
