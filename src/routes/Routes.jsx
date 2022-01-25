import User from "./User";
import Admin from "./Admin";
import Vaccination from "./Vaccination";
import { Home, NotFound } from "pages";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { LayoutRoot } from "components/layout/layout-root";

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
        <LayoutRoot>
          {" "}
          <Route path="*" component={NotFound} />
        </LayoutRoot>
      </Switch>
    </Router>
  );
}
