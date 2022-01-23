import React from "react";
import Home from "../pages/home/home";
import RoutesPathsConstants from "./routes-paths-constants";
import NotFound from "../pages/not-found/not-found";
import {Route, Routes} from "react-router-dom";
import {Header, Footer} from "../components";
import {Trade} from "../pages/trade";

export const RouterConfig = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={RoutesPathsConstants.Root} element={<Home/>}/>
        <Route path={RoutesPathsConstants.Trade} element={<Trade/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </>
  );
};
