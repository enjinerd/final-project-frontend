import jwt_decode from "jwt-decode";
import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

export default function PrivateRoute(props) {
  const { isAuthenticated, isAuthenticating, token, logout } = useAuthStore();
  const [isExpired, setExpired] = useState(false);
  const decode = jwt_decode(token);

  const { component: Component, ...rest } = props;
  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!isAuthenticated && decode.exp * 1000 < Date.now()) {
    return <Redirect to="/user/login" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;

  //redirect if there is no user
}
