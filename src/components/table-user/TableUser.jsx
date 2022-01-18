import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthAdminStore from "stores/useAuthAdminStore";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function TableUser() {
  const api = import.meta.env.VITE_API_HOST;
  let datum = useLocation();
  const history = useHistory();
  const { token } = useAuthAdminStore();
  const { isAuthenticated } = useAuthAdminStore();
  const [dataSessions, setDataSession] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersProfile, setUsersProfile] = useState([]);
  const decoded = jwt_decode(token);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get(`${api}/admin/${decoded.user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataSession(response.data.data.vaccine_session);
      console.log("===data session==");
      console.log(dataSessions);
      dataSessions.map((session, index) => {
        console.log("===user length==");
        console.log(users.length);
        console.log("===session length==");
        console.log(session.vaccine_session_detail.length);
        users.length === 0
          ? session.vaccine_session_detail.length > 0 &&
            setUsers([...session.vaccine_session_detail])
          : session.vaccine_session_detail.length > 0 &&
            setUsers([...users, ...session.vaccine_session_detail]);
        console.log("===users==");
        console.log(users);
      });
    }
    fetchMyAPI();
    console.log("===users akhir==");
    console.log(users);
  }, []);

  useEffect(() => {
    users.map((user, index) => {
      let family = handleGetCitizenId(user.family_member_id);
      let profile = handleGetProfile(family.citizen_id);
      setUsersProfile((prev) => [
        ...prev,
        { ...profile, status: family.status_vaccines },
      ]);
    });
  }, []);

  const handleGetCitizenId = async (familyId) => {
    let response = await axios.get(`${api}/families/${familyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  };

  const handleGetProfile = async (citizenId) => {
    let response = await axios.get(`${api}/citizen/profile/${citizenId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  };

  // const custom_theme = createMuiTheme({
  //   palette: {
  //     primary: {
  //       main: '#4caf50',
  //     },
  //     secondary: {
  //       main: '#10B981',
  //     }
  //   }
  // });

  return (
    // <MuiThemeProvider theme={custom_theme}>
    <MaterialTable
      title="Positioning Actions Column Preview"
      columns={[
        { title: "Name", field: "name" },
        { title: "Birthday", field: "birthday" },
        { title: "Address", field: "address" },
        { title: "Phone Number", field: "handphone_number" },
        { title: "Status", field: "status", type: "numeric" },
      ]}
      data={usersProfile}
      actions={[
        {
          icon: () => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="#7D90B2"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          ),
          tooltip: "Edit Vaccine",
          position: "row",
          onClick: (event, rowData) => alert("You edit " + rowData.name),
        },
        {
          icon: () => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="#7D90B2"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ),
          tooltip: "Delete Vaccine",
          position: "row",
          onClick: (event, rowData) =>
            confirm("You want to delete " + rowData.name),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
        sorting: true,
        selection: true,
        showTitle: false,
        headerStyle: {
          backgroundColor: "#D1FAE5",
          textTransform: "uppercase",
        },
        rowStyle: {},
        showTextRowsSelected: false,
        searchFieldAlignment: "left",
        searchFieldStyle: {
          backgroundColor: "#FFFFFF",
          padding: "5px",
          borderRadius: "5px",
        },
      }}
      components={{
        Toolbar: (props) => (
          <div
            style={{
              backgroundColor: "#D1FAE5",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <MTableToolbar {...props} />
          </div>
        ),
      }}
      style={{
        flex: "1 1 0%",
      }}
    />
    // </MuiThemeProvider>
  );
}
