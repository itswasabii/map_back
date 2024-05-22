import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/nunito"; // Defaults to weight 400
import "@fontsource/nunito/400.css"; // Specify weight
import "@fontsource/nunito/400-italic.css";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
