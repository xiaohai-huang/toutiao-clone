import { CssBaseline } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import Header from "./features/header/Header";
import MainPage from "./pages/MainPage";
import UserAuthPage from "./pages/UserAuthPage";
import NewsCreationPage from "./pages/NewsCreationPage";
import NewsEditPage from "./pages/NewsEditPage";
import HotCard from "./features/company/HotCard";
import DetailsPage from "./pages/DetailsPage";
import VideoDetailsPage from "./pages/VideoDetailsPage";
import { useEffect } from "react";
import { fetchVideos } from "./features/feed/feedSlice";

function App() {
  const displayMode = useSelector((state) => state.app.displayMode);
  let theme;
  let PCTheme = createMuiTheme({
    palette: {
      type: displayMode,
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
      type: displayMode,
      primary: {
        main: "#208eda",
        light: "#406599",
      },
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
  const dispatch = useDispatch();
  // (sm & xs)
  theme = device === "PC" ? PCTheme : mobileTheme;
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />

        <Header />
        <Switch>
          <Route exact path="/test">
            <HotCard title="hot card" />
          </Route>

          <Route exact path="/register">
            <UserAuthPage type="register" />
          </Route>
          <Route exact path="/login">
            <UserAuthPage type="login" />
          </Route>

          <Route exact path="/:category">
            <MainPage />
          </Route>
          <Route exact path="/news/create">
            <NewsCreationPage />
          </Route>
          <Route exact path="/news/edit/:news_id">
            <NewsEditPage />
          </Route>
          <Route exact path="/video/:video_id">
            <VideoDetailsPage />
          </Route>
          <Route exact path="/news/:news_id">
            <DetailsPage />
          </Route>
          <Redirect to="/__all__" />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
