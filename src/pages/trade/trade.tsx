import React, {FC} from 'react';
import TradeForm from "./components/trade-form/trade-form";
import "./trade.scss";

interface ITradeProps {
}

const Trade: FC<ITradeProps> = () => {
  return (<>
      <div className="trade d-flex align-items-center justify-content-center position-relative">
        <div className="trade-form-bg-image position-absolute"/>
        <TradeForm/>
      </div>
    </>);
};

export default Trade;
