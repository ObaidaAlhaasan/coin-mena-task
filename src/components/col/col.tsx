import React, {FC} from 'react';
import {strOrNum} from "../../types/cryptos";

interface IColProps {
  md?: strOrNum;
  sm?: strOrNum;
  lg?: strOrNum;
  className?: string;
}

const Col: FC<IColProps> = ({lg, md, className, children}) => {
  console.log(lg)
  return (
    <div className={`col-sm-12 col-md-${md ?? ''} ${lg ? `col-lg-${lg}` : ''} ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Col;
