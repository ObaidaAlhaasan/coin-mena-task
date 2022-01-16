import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {RouterConfig} from "./navigation/router-config";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterConfig/>
      </BrowserRouter>
    </div>
  );
}

export default App;
