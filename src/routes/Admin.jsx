import PrivateRouteAdmin from "./PrivateRouteAdmin";
import AdminTable from "../components/admin-table/AdminTable";
import { AddSession } from "../pages/admin/add-session/AddSession";
import { AddVaccine } from "../pages/admin/add-vaccine/AddVaccine";
import { Login } from "../pages/admin/login/Login";
import { SignUp } from "../pages/admin/signup/SignUp";
import { LayoutAdmin } from "components/layout/layout-admin";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AddUser } from "../pages/admin/add-user/AddUser";

export default function User() {
  const { path } = useRouteMatch();

  return (
    <LayoutAdmin>
      <Switch>
        <PrivateRouteAdmin path={`${path}`} component={AdminTable} exact />
        <PrivateRouteAdmin
          path={`${path}/session`}
          component={AdminTable}
          exact
        />
        <PrivateRouteAdmin path={`${path}/user`} component={AdminTable} exact />
        <PrivateRouteAdmin
          path={`${path}/vaccine/add`}
          component={AddVaccine}
          exact
        />
        <PrivateRouteAdmin
          path={`${path}/session/add`}
          component={AddSession}
          exact
        />
        <PrivateRouteAdmin
          path={`${path}/user/add`}
          component={AddUser}
          exact
        />
        <Route path={`${path}/logins`} component={Login} />
        <Route path={`${path}/signup`} component={SignUp} />
      </Switch>
    </LayoutAdmin>
  );
}
