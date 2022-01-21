import PrivateRouteAdmin from "./PrivateRouteAdmin";
import TableVaccine from "../components/table-vaccine/TableVaccine";
import TableSession from "../components/table-session/TableSession";
import TableUser from "../components/table-user/TableUser";
import { AddSession } from "../pages/admin/add-session/AddSession";
import { AddVaccine } from "../pages/admin/add-vaccine/AddVaccine";
import { Login } from "../pages/admin/login/Login";
import { SignUp } from "../pages/admin/signup/SignUp";
import { Profile } from "../pages/admin/profile/Profile";
import { LayoutAdmin } from "components/layout/layout-admin";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AddUser } from "../pages/admin/add-user/AddUser";
import { EditFamily } from "../pages/admin/edit-family/EditFamily";
import { SessionDetail } from "../pages/admin/session-detail/SessionDetail";

export default function User() {
  const { path } = useRouteMatch();

  return (
    <LayoutAdmin>
      <Switch>
        <PrivateRouteAdmin path={`${path}`} component={Profile} exact />
        <PrivateRouteAdmin
          path={`${path}/vaccine`}
          component={TableVaccine}
          exact
        />
        <PrivateRouteAdmin
          path={`${path}/session`}
          component={TableSession}
          exact
        />
        <PrivateRouteAdmin path={`${path}/user`} component={TableUser} exact />
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
        <PrivateRouteAdmin
          path={`${path}/session/detail`}
          component={SessionDetail}
          exact
        />
        <PrivateRouteAdmin
          path={`${path}/session/detail/edit`}
          component={EditFamily}
          exact
        />
        <Route path={`${path}/logins`} component={Login} />
        <Route path={`${path}/signup`} component={SignUp} />
      </Switch>
    </LayoutAdmin>
  );
}
