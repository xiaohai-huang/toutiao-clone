import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ed4040",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
