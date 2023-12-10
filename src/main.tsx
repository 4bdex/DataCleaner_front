import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme.ts";
import UserProvider from "./providers/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <UserProvider>
          <App />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
