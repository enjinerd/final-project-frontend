import jwt_decode from "jwt-decode";
import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";

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
  if (isAuthenticated && jwt_decode(token).exp * 1000 > Date.now() == false) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/user/login" />;

  //redirect if there is no user
}
export default PrivateRoute;
