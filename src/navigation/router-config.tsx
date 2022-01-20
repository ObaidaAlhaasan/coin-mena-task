import Home from "../pages/home/home";
import RoutesPathsConstants from "./routes-paths-constants";
import Trade from "../pages/trade/trade";
import NotFound from "../pages/not-found/not-found";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export const RouterConfig = () => {
  return (
    <>
      <Header/>
      <div>
      <Routes>
        <Route path={RoutesPathsConstants.Root} element={<Home/>}/>
        <Route path={RoutesPathsConstants.Trade} element={<Trade/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </div>
      <Footer/>
    </>
  )
}
