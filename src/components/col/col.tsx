import React, {FC} from 'react';

interface IColProps {
  md?: number | string;
  sm?: number | string;
  lg?: number | string;
  className?: string;
}

const Col: FC<IColProps> = ({lg, md, className, children}) => {
  return (
    <div className={`col-md-${md} ${className}`}>
      {children}
    </div>
  );
};

export default Col;
