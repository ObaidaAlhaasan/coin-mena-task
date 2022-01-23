import React, {FC} from 'react';

interface IRowProps {
  className?: string
}

export const Row: FC<IRowProps> = ({children, className}) => {
  return (
    <div className={`row ${className ?? ''}`}>
      {children}
    </div>
  );
};
