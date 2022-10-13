import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./context";
import { Routes } from "./routes";
import { theme } from "./styles/theme";

export function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}
