import React, {FC} from 'react';
import {strOrNum} from "../../types/cryptos";

interface IColProps {
  md?: strOrNum;
  sm?: strOrNum;
  lg?: strOrNum;
  className?: string;
}

export const Col: FC<IColProps> = ({lg, md, className, children}) => {
  return (
    <div className={`col-sm-12 col-md-${md ?? ''} ${lg ? `col-lg-${lg}` : ''} ${className ?? ''}`}>
      {children}
    </div>
  );
};
