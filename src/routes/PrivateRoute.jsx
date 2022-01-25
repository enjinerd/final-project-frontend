import jwt_decode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

/**
 * If the user is authenticated, render the component. If not, redirect to the login page.
 * @returns A Route component.
 */
function PrivateRoute(props) {
  const { isAuthenticated, isAuthenticating, token, logout } = useAuthStore();
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

    if (decoded.exp < Date.now() / 1000 || decoded.role !== "USER") {
      logout();
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/user/login" />;
}

export default PrivateRoute;
