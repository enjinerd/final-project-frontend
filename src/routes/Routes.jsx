import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { Home, NotFound } from "../pages";
import { LayoutRoot } from "../components/layout/layout-root";
import AdminTable from "../components/admin-table/AdminTable";
import { LayoutAdmin } from "../components/layout/layout-admin";

export default function Routes() {
  return (
    <Router>
        <Switch>
          <LayoutAdmin>
            <Route exact path="/admin" component={AdminTable} />
          </LayoutAdmin>
          <LayoutRoot>
            <Route exact path="/" component={Home} />
            <Route path="/*" component={NotFound} />
          </LayoutRoot>
        </Switch>
    </Router>
  );
}
