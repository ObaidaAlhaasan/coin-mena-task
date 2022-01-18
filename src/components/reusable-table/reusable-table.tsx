import React, {FC} from "react";
import {usePagination, useSortBy, useTable} from "react-table";

interface ITableProps {
  columns: any[];
  data: any[];
  pageIndex: number;
  pageSize: number;
  totalItems:number
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
}

const ReusableTable: FC<ITableProps> = ({columns, data, pageIndex, pageSize, totalItems,  goToPage, nextPage, previousPage, setPageSize}) => {
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageSize;
  const pagesCount = Math.ceil(totalItems / pageSize);
  const pageSizes: number[] = Array.from({length:pagesCount});

  console.log(pageSize);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex, pageSize},
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
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <br/>

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
            <button className="btn btn-sm btn-outline-secondary" onClick={() => goToPage(0)}
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
            <button className="btn btn-sm btn-outline-secondary" onClick={() => goToPage(pagesCount - 1)}
                    disabled={!canNextPage}>
              <i className="fas fa-angle-double-right"/>
            </button>
          </div>
        </div>
        <span className="">
          Page
          <strong>
            {pageIndex + 1} of {pagesCount}
          </strong>{' '}
        </span>

        <div className="mx-3 d-flex align-items-center">
          <span className="me-2">Rows Per Page: </span>
          <select className="form-control-sm" id="rows-per-page">
            {[10, 20, 30, 50].map(pageSize => (
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

export default ReusableTable;
