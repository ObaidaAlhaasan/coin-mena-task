import React, {FC} from 'react';

interface IColProps {
  md?: number | string;
  sm?: number | string;
  lg?: number | string;
  className?: string;
}

const Col: FC<IColProps> = ({lg, md, className, children}) => {
  return (
    <div className={`col-sm-12 col-md-${md} col-lg-${lg} ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Col;
