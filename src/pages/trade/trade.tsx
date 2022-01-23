import React, {FC} from "react";
import TradeForm from "./components/trade-form/trade-form";
import {useStore} from "../../store/store";

import "./trade.scss";

interface ITradeProps {
}

export const Trade: FC<ITradeProps> = () => {
  const {currentUser} = useStore();

  return (
    <>
      <div className="trade d-flex align-items-center justify-content-center position-relative">
        <div className="trade-form-bg-image position-absolute"/>
        <TradeForm key={currentUser?.email ?? "default"}/>
      </div>
    </>
  );
};
