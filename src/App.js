import { CssBaseline } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Header from "./features/header/Header";
import MainPage from "./pages/MainPage";
import { useSelector } from "react-redux";

function App() {
  let theme;

  let PCTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#208eda",
        light: "#406599",
      },
      secondary: {
        main: "#ed4040",
      },
      background: {
        secondary: "#f4f5f6",
      },
    },
    typography: {
      h6: {
        fontWeight: "700",
        fontSize: "1.2rem",
      },
    },
  });
  // sm xs
  let mobileTheme = createMuiTheme({
    palette: {
      secondary: {
        main: "#ed4040",
      },
      background: {
        default: "#fff",
        secondary: "rgb(244, 245, 246)",
      },
    },
    typography: {
      h6: {
        fontSize: "1.1rem",
        fontWeight: "400",
        fontFamily:
          "'STHeiti', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif",
      },
    },
  });
  const device = useSelector((state) => state.app.device);

  // (sm & xs)
  theme = device === "PC" ? PCTheme : mobileTheme;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />

        <Header />
        <Switch>
          <Route exact path="/nice">
            <p>nice</p>
          </Route>
          <Route exact path="/:category">
            <MainPage />
          </Route>
          <Redirect to="/__all__" />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
