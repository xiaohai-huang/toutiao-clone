import { CssBaseline } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./features/header/Header";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <CssBaseline />

      <Header />
      <Switch>
        <Route exact path="/:category">
          <MainPage />
        </Route>
        <Redirect to="/__all__" />
      </Switch>
    </div>
  );
}

export default App;
