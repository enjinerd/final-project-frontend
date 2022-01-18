import jwt_decode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";

function PrivateRouteAdmin(props) {
  const { isAuthenticated, isAuthenticating, token, logout } =
    useAuthAdminStore();
  const { component: Component, ...rest } = props;

  if (isAuthenticating) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="w-20 h-20 rounded-full border-b-2 border-gray-900 animate-spin"></div>
      </div>
    );
  }
  if (isAuthenticated) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      logout();
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/admin/logins" />;

  //redirect if there is no user
}
export default PrivateRouteAdmin;
