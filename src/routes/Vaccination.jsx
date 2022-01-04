import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NotFound } from "pages";
import { LayoutRoot } from "components/layout/layout-root";
import PrivateRoute from "./PrivateRoute";
import { VaccinationHomepage } from "pages/vaccination";

export default function Vaccination() {
  const { path } = useRouteMatch();

  return (
    <LayoutRoot>
      <Switch>
        <Route exact path={path} component={VaccinationHomepage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </LayoutRoot>
  );
}
