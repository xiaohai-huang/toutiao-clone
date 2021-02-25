import { Route, Switch } from "react-router-dom";
import Header from "./features/header/Header";
import HotBoard from "./features/hotboard/HotBoard";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <HotBoard />
      </Switch>
    </div>
  );
}

export default App;
