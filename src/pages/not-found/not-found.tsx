import React, { FC } from "react";
import RoutesPathsConstants from "../../routes/routes-paths-constants";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="not-found text-center">
      <img
        src="/assets/images/not-found.jpg"
        alt="not found"
        className="not-found__img"
      />
      <p>
        {" "}
        Ops, The page is not found back to{" "}
        <Link to={RoutesPathsConstants.Root}>
          <strong className="has-text-primary has-hover ">Home</strong>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
