import "./crypto-assets-table.scss";
import React, {FC, useMemo, useState} from 'react';
import {usePaginatedCryptoAssets} from "../../../../lib/hooks";
import {CryptoTableColumns} from "./crypto-table-columns";
import {ResponseStatus} from "../../../../types/cryptos";
import {Col, LoadingError, LoadingSpinner, ReusableTable} from "../../../../components";

const CryptoAssetsTable: FC = () => {
  const [queryPageIndex, setPageIndex] = useState<number>(0);
  const [queryPageItemsCount, setPageItemsCount] = useState<number>(10);

  const {data: response, status} = usePaginatedCryptoAssets({queryPageItemsCount, queryPageIndex})
  const data = response?.data ?? [];

  const columns = useMemo(() => CryptoTableColumns, []);

  if (status === ResponseStatus.Error)
    return <LoadingError title="Crypto Assets"/>;

  return (
    <section className="crypto-assets-table row justify-content-center w-100 position-relative ">
      <div className="trades-bg-image position-absolute"/>
      <Col md={8} className="table-responsive has-glass-bg">
        {status === ResponseStatus.Loading && <LoadingSpinner/>}
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
