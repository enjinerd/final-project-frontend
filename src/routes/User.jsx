import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Login, SignUp, UserDashboard } from "pages/user";
import { NotFound } from "pages";

export default function User() {
  const { path } = useRouteMatch();

  return (
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
  );
}
