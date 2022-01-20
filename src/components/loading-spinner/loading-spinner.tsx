import React, {FC} from "react";
import "./loading-spinner.scss";

const LoadingSpinner: FC = () => {
  return <div className="loading-spinner text-center mt-5">
    <div className="lds-ring">
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  </div>;
}

export default LoadingSpinner;
