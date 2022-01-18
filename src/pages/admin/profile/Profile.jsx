import { useState, useEffect } from "react";
import useAuthAdminStore from "stores/useAuthAdminStore";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";

export function Profile() {
  const api = import.meta.env.VITE_API_HOST;
  const { token } = useAuthAdminStore();
  const { isAuthenticated, logout } = useAuthAdminStore();
  const decoded = jwt_decode(token);
  const [dataHf, setDataHf] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get(`${api}/admin/${decoded.user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataHf(response.data.data);
    }
    fetchMyAPI();
  }, []);

  const handleLogout = async () => {
    await logout();
    if (!error) {
      history.push("/admin/logins");
    }
  };

  return (
    <div style={{ flex: "1 1 0%" }} className="p-8">
      <div className="card profile shadow-lg">
        <div className="card-body">
          <h2 className="card-title name">{dataHf.name}</h2>
          <p className="address">{dataHf.address}</p>
          <p className="type my-2">{dataHf.type}</p>
          <div className="button-wrapper my-5">
            <button className="btn">Edit</button>
            <button className="btn mx-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
