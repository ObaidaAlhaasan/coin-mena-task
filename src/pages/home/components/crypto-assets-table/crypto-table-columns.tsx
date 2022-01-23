import {CryptoIcon} from "../../../../components";
import MoneyFormatterService from "../../../../services/money-formatter";
import {Row} from "react-table";
import React from "react";

export const CryptoTableColumns = [
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
    Cell: (cell: { value: string }) => <div className="d-flex align-items-center"><span className="text-capitalize text-white">{cell.value}</span></div>
  },
  {
    Header: "Price",
    accessor: "metrics.market_data.price_usd",
    Cell: (cell: { value: string }) => <span className="text-white">{MoneyFormatterService.Format(cell.value)}</span>
  },
  {
    id: "symbol_id",
    Header: "ID",
    accessor: "symbol",
    Cell: (cell: { value: string }) => <span className="text-capitalize text-white">{cell.value}</span>,
    disableSortBy: true
  },
  {
    id: "Trade", Header: "", accessor: "", Cell: () => {
      return (
        <div className="dropdown">
          <button className="btn dropdown-toggle btn-outline-secondary text-white" type="button" id="dropdownMenuButton1"
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
  },
  {
    id: 'expander', isExpanded: true, Cell: ({row}: { row: Row, toggleRowExpanded: () => void }) => {
      return <span className="d-block w-3rem arrow-icon-wrapper text-end "{...row.getToggleRowExpandedProps({})}>
      {row.isExpanded ? <i className="fas fa-chevron-down d-block text-white has-hover-text-primary"/> :
        <i className="fas fa-chevron-right d-block text-white has-hover-text-primary"/>}
      </span>
    }
  }
]
