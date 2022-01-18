import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {RouterConfig} from "./navigation/router-config";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
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
