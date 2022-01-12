import AdminTable from "../components/admin-table/AdminTable";
import { AddSession } from "../pages/admin/add-session/AddSession";
import { AddVaccine } from "../pages/admin/add-vaccine/AddVaccine";
import User from "./User";
import Vaccination from "./Vaccination";
import { LayoutAdmin } from "components/layout/layout-admin";
import { LayoutRoot } from "components/layout/layout-root";
import { Home, NotFound } from "pages";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { AddUser } from "../pages/admin/add-user/AddUser";


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
        <Route exact path="/admin/vaccine/add">
          <LayoutAdmin>
            <AddVaccine />
          </LayoutAdmin>
        </Route>
        <Route exact path="/admin/session/add">
          <LayoutAdmin>
            <AddSession />
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
        <Route exact path="/admin/user/add">
          <LayoutAdmin>
            <AddUser />
          </LayoutAdmin>
        </Route>
        <Route exact path="/admin/user/add">
          <LayoutAdmin>
            <AddUser />
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
