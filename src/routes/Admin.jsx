import { LayoutRoot } from "components/layout/layout-root";
import { NotFound } from "pages";
import { Login, SignUp, UserDashboard } from "pages/user";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <LayoutRoot>
      <Switch>
        <Route exact path={path} component={UserDashboard} />
        <Route path={`${path}/login`}>
          <Login />
        </Route>
        <Route path={`${path}/signup`}>
          <SignUp />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </LayoutRoot>
  );
}
