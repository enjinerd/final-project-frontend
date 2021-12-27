import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useAuthStore from "stores/useAuthStore";

export default function PrivateRoute(props) {
  const { isAuthenticated, isAuthenticating, token, logout } = useAuthStore();
  const [isExpired, setExpired] = useState(false);
  if (token != null) {
    const decode = jwt_decode(token);
    if (decode.exp * 1000 < Date.now()) {
      setExpired(true);
      logout();
    }
  }
  const { component: Component, ...rest } = props;
  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center p-12 ">
        <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (isAuthenticated && !isExpired) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  //redirect if there is no user
  return <Redirect to="/user/login" />;
}
