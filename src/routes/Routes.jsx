import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { Home, NotFound} from "pages";
import { LayoutRoot } from "components/layout/layout-root";
import { LayoutAdmin } from "components/layout/layout-admin";
import User from "./User";
import AdminTable from "../components/admin-table/AdminTable";


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
        <Route exact path="/admin/vaccine">
          <LayoutAdmin>
            <AdminTable />
          </LayoutAdmin>
        </Route>
        <Route exact path="/admin/session">
          <LayoutAdmin>
            <AdminTable />
          </LayoutAdmin>
        </Route>
        <Route exact path="/admin/user">
          <LayoutAdmin>
            <AdminTable />
          </LayoutAdmin>
        </Route>
        <Route exact path="/*">
          <LayoutRoot>
            <NotFound />
          </LayoutRoot>
        </Route>
      </Switch>
    </Router>
  );
}
