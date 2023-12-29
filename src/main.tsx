import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme.ts";
import UserProvider from "./providers/UserProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <UserProvider>
            <App />
          </UserProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
