import "./crypto-assets-table.scss";
import React, {FC, useMemo, useState} from 'react';
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import ReusableTable from "../../../../components/reusable-table/reusable-table";
import {usePaginatedCryptoAssets} from "../../../../hooks/usePaginatedCryptoAssets";
import Col from "../../../../components/col/col";
import {CryptoTableColumns} from "./crypto-table-columns";

const CryptoAssetsTable: FC = () => {
  const [queryPageIndex, setPageIndex] = useState<number>(0);
  const [queryPageItemsCount, setPageItemsCount] = useState<number>(10);

  const {data: response, status} = usePaginatedCryptoAssets({queryPageItemsCount, queryPageIndex})
  const data = response?.data ?? [];

  const columns = useMemo(() => CryptoTableColumns, []);

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
