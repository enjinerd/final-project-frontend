import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthAdminStore from "../../../stores/useAuthAdminStore";
import jwt_decode from "jwt-decode";
import axios from "axios";
import useAdmin from "../../../hooks/admin/useAdmin";

export function SessionDetail() {
  const api = import.meta.env.VITE_API_HOST;
  const datum = useLocation();
  const history = useHistory();
  const { token } = useAuthAdminStore();
  const { isAuthenticated } = useAuthAdminStore();
  const [family, setFamily] = useState([]);
  const [citizen, setCitizen] = useState([]);
  const decoded = jwt_decode(token);
  const { getSessionById, getCitizenId, isLoading } = useAdmin();

  useEffect(async () => {
    let response = await getSessionById(token, history.location.state.id);
    response.vaccine_session_detail.map(async (family, index) => {
      let familyProfile = await getCitizenId(token, family.family_member_id);
      setFamily((prev) => [...prev, familyProfile]);
    });
  }, []);

  return (
    <MaterialTable
      title="Positioning Actions Column Preview"
      columns={[
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
        { title: "NIK", field: "nik" },
        { title: "Status Vaksin", field: "status_vaccines" },
        { title: "Phone Number", field: "handphone" },
      ]}
      data={family}
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
          tooltip: "Edit Family",
          position: "row",
          onClick: (event, rowData) => {
            history.push({
              pathname: `${datum.pathname}/edit`,
              state: {
                id: rowData.id,
                status: rowData.status_vaccines,
              },
            });
          },
        },
      ]}
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
  );
}
