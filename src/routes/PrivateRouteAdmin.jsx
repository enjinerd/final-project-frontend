import jwt_decode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";

function PrivateRouteAdmin(props) {
  const { isAuthenticated, isAuthenticating, token } = useAuthAdminStore();
  const { component: Component, ...rest } = props;

  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
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
