import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {RouterConfig} from "./navigation/router-config";
import {QueryClient, QueryClientProvider} from "react-query";
import {useStore} from "./store/store";

const queryClient = new QueryClient();

function App() {
  const {checkAlreadyLoggedIn} = useStore();

  useEffect(() => {
    checkAlreadyLoggedIn();
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouterConfig/>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
