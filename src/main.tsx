import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme.ts";
import UserProvider from "./providers/UserProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
