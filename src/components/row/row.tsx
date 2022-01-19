import React, {FC} from 'react';

const Row: FC = ({children}) => {
  return (
    <div className="row">
      {children}
    </div>
  );
};

export default Row;
