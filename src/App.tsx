import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {RouterConfig} from "./navigation/router-config";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <RouterConfig/>
      </BrowserRouter>
    </div>
  );
}

export default App;
