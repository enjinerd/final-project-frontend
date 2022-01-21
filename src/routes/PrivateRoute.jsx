import jwt_decode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

function PrivateRoute(props) {
  const { isAuthenticated, isAuthenticating, token, logout } = useAuthStore();
  console.log(token, "token");
  console.log(isAuthenticated, "isAuthenticated");
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
    console.log(decoded);
    if (decoded.exp < Date.now() / 1000 || decoded.role !== "USER") {
      logout();
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/user/login" />;

  //redirect if there is no user
}
export default PrivateRoute;
