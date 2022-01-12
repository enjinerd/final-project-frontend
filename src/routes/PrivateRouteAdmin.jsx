import jwt_decode from "jwt-decode";
import { Redirect, Route } from "react-router-dom";
import useAuthAdminStore from "stores/useAuthAdminStore";

function PrivateRouteAdmin() {
  const { isAuthenticated, isAuthenticating, token } = useAuthAdminStore();

  if (isAuthenticating) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="w-20 h-20 rounded-full border-b-2 border-gray-900 animate-spin"></div>
      </div>
    );
  }
  if (isAuthenticated && jwt_decode(token).exp * 1000 > Date.now() == false) {
    return <Route />;
  }
  return <Redirect to="/admin/logins" />;

  //redirect if there is no user
}
export default PrivateRouteAdmin;
