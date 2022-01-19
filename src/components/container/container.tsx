import React, {FC} from 'react';
interface IContainerProps {
  className?: string
}
const Container: FC<IContainerProps> = ({children, className}) => {
  return (
    <div className={`container ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Container;
