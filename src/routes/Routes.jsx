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

export default function Routes() {
  return (
    <Router>
      <LayoutRoot>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </LayoutRoot>
    </Router>
  );
}
