import User from "./User";
import Admin from "./Admin";
import Vaccination from "./Vaccination";
import { LayoutRoot } from "components/layout/layout-root";
import { Home } from "pages";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LayoutRoot>
            <Home />
          </LayoutRoot>
        </Route>
        <Route path="/user" component={User} />
        <Route path="/vaccination" component={Vaccination} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}
