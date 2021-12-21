import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Home, NotFound } from "pages";
import { LayoutRoot } from "components/layout/layout-root";
import User from "./User";

export default function Routes() {
  return (
    <Router>
      <LayoutRoot>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </LayoutRoot>
    </Router>
  );
}
