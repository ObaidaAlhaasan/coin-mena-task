import React, {FC} from 'react';

interface IRowProps {
  className?: string
}

const Row: FC<IRowProps> = ({children, className}) => {
  return (
    <div className={`row ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Row;
