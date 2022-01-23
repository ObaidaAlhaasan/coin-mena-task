import React, { FC } from "react";
import "./logo.scss";
import { Link } from "react-router-dom";
import routesPathsConstants from "../../routes/routes-paths-constants";

export const Logo: FC = () => (
  <Link to={routesPathsConstants.Root}>
    <img src="/assets/svgs/bitcoin.svg" alt="logo" className="logo" />
    <strong className="has-text-primary">Coin Sorla</strong>
  </Link>
);
