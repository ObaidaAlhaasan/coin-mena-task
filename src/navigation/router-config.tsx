import Home from "../pages/home/home";
import RoutesPathsConstants from "./routes-paths-constants";
import Trade from "../pages/trade/trade";
import NotFound from "../pages/not-found/not-found";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../components/header/header";

export const RouterConfig = () => {
  return (
    <>
      <Header/>
      <div className="container">
      <Routes>
        <Route path={RoutesPathsConstants.Root} element={<Home/>}/>
        <Route path={RoutesPathsConstants.Trade} element={<Trade/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </div>
    </>
  )
}
