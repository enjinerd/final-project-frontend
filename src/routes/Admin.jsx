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
        <PrivateRouteAdmin path={`${path}`} exact>
          <AdminTable />
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path={`${path}/session`} exact>
          <AdminTable />
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path={`${path}/user`} exact>
          <AdminTable />
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path={`${path}/vaccine/add`} exact>
          <AddVaccine />
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path={`${path}/session/add`} exact>
          <AddSession />
        </PrivateRouteAdmin>
        <PrivateRouteAdmin path={`${path}/user/add`} exact>
          <AddUser />
        </PrivateRouteAdmin>
        <Route path={`${path}/logins`}>
          <Login />
        </Route>
        <Route path={`${path}/signup`}>
          <SignUp />
        </Route>
      </Switch>
    </LayoutAdmin>
  );
}
