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
import { LayoutAdmin } from "components/layout/layout-admin";
import User from "./User";
import Vaccination from "./Vaccination";
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
        <Route path="/vaccination" component={Vaccination} />
        <Route exact path="/admin/vaccine">
          <LayoutAdmin>
            <AdminTable
              columns={[
                { title: "Name", field: "name" },
                { title: "Stock", field: "stock", type: "numeric" },
              ]}
              data={[
                { name: "Sinovac", stock: 600 },
                { name: "Moderna", stock: 600 },
              ]}
            />
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
