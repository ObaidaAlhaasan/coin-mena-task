import React, { FC } from "react";
import TradeForm from "./components/trade-form/trade-form";
import "./trade.scss";
import { useStore } from "../../store/store";

interface ITradeProps {}

const Trade: FC<ITradeProps> = () => {
  const { currentUser } = useStore();

  return (
    <>
      <div className="trade d-flex align-items-center justify-content-center position-relative">
        <div className="trade-form-bg-image position-absolute" />
        <TradeForm key={currentUser?.email ?? "default"} />
      </div>
    </>
  );
};

export default Trade;
