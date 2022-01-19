import React, {FC, useEffect} from "react";
import {useExpanded, usePagination, useSortBy, useTable} from "react-table";
import exp from "constants";

interface ITableProps {
  columns: any[];
  data: any[];
  queryPageIndex: number;
  queryPageSize: number;
  totalCount: number;
  setPageIndex: (pageInd: number) => void;
  setPageItemsCount: (size: number) => void;
}

const ReusableTable: FC<ITableProps> = (props) => {
  const {columns, data, queryPageIndex, queryPageSize, totalCount, setPageIndex, setPageItemsCount} = props;

  const {
    headerGroups,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    page,
    state: {pageIndex, pageSize, expanded},

    gotoPage,
    getTableProps,
    getTableBodyProps,
    previousPage,
    nextPage,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      },
      manualPagination: true,
      pageCount: Math.ceil(totalCount / queryPageSize)
    },
    useSortBy,
    useExpanded,
    usePagination,
  )

  useEffect(() => {
    console.log("change on size", pageSize);
    setPageItemsCount(pageSize);
  }, [pageSize]);

  useEffect(() => {
    setPageIndex(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    console.log("Change on ", expanded);
  }, [expanded]);

  return (
    <>
      <table {...getTableProps()} className="table table-hover">
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
                      ? <i className="fas fa-angle-up has-text-primary "/>
                      : <i className="fas fa-angle-down has-text-primary"/>
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
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
              {row.isExpanded &&
                <tr>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}><p>Lorem ipsum dolor sit amet, consectetur.</p></td>
                  })}
                </tr>
              }
            </>
          )
        })}
        </tbody>
      </table>

      <div className="pagination d-flex align-items-center justify-content-between">
        <div>
          <div className="btn-group mx-1">
            <button className="btn btn-sm btn-outline-secondary has-hover-text-primary" onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>
              <i className="fas fa-angle-double-left "/>
            </button>
            <button className="btn btn-sm btn-outline-secondary has-hover-text-primary" onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
              <i className="fas fa-angle-left"/>
            </button>
          </div>

          <div className="btn-group mx-1">
            <button className="btn btn-sm btn-outline-secondary has-hover-text-primary" onClick={() => nextPage()}
                    disabled={!canNextPage}>
              <i className="fas fa-angle-right"/>
            </button>
            <button className="btn btn-sm btn-outline-secondary has-hover-text-primary"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>
              <i className="fas fa-angle-double-right"/>
            </button>
          </div>
        </div>
        <span className="">
          Page
          <strong className="has-text-primary">
            {pageIndex + 1} <span className="text-dark">of</span> {pageOptions.length}
          </strong>{' '}
        </span>

        <div className="mx-3 d-flex align-items-center">
          <span className="me-2">Rows Per Page: </span>
          <select className="form-control-sm" id="rows-per-page" onChange={e => setPageSize(Number(e.target.value))}>
            {[10, 20, 30, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

      </div>
    </>
  )
}

export default ReusableTable;
