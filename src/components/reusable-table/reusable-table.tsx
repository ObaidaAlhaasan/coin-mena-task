import React, { FC, useEffect } from "react";
import { useExpanded, usePagination, useSortBy, useTable } from "react-table";

interface ITableProps {
  columns: any[];
  data: any[];
  queryPageIndex: number;
  queryPageSize: number;
  totalCount: number;
  setPageIndex: (pageInd: number) => void;
  setPageItemsCount: (size: number) => void;
}

export const ReusableTable: FC<ITableProps> = (props) => {
  const {
    columns,
    data,
    queryPageIndex,
    queryPageSize,
    totalCount,
    setPageIndex,
    setPageItemsCount,
  } = props;

  const {
    headerGroups,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    page,
    state: { pageIndex, pageSize },

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
      pageCount: Math.ceil(totalCount / queryPageSize),
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    setPageItemsCount(pageSize);
  }, [pageSize]);

  useEffect(() => {
    setPageIndex(pageIndex);
  }, [pageIndex]);

  return (
    <>
      <table {...getTableProps()} className="table table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="d-flex align-items-center text-white">
                    <span>{column.render("Header")}</span>
                    <span className="d-inline-block mx-2 ">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i className="fas fa-angle-up  text-white " />
                        ) : (
                          <i className="fas fa-angle-down  text-white" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className=" text-white">
                          <p>Lorem ipsum dolor sit amet, consectetur.</p>
                        </td>
                      );
                    })}
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      <div className="pagination d-flex align-items-center justify-content-between">
        <div>
          <div className="btn-group mx-1">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <i className="fas fa-angle-double-left text-white has-hover-text-primary" />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <i className="fas fa-angle-left text-white has-hover-text-primary" />
            </button>
          </div>

          <div className="btn-group mx-1">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <i className="fas fa-angle-right text-white has-hover-text-primary" />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <i className="fas fa-angle-double-right text-white has-hover-text-primary" />
            </button>
          </div>
        </div>
        <span>
          <span className="me-1 text-white">Page</span>
          <strong className=" text-white">
            {pageIndex + 1} <span className="text-white">of</span>{" "}
            {pageOptions.length}
          </strong>{" "}
        </span>

        <div className="mx-3 d-flex align-items-center">
          <span className="me-2 text-white">Rows Per Page: </span>
          <select
            className="form-control-sm select-page-size"
            id="rows-per-page"
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 50].map((pageSize, i) => (
              <option key={i} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
