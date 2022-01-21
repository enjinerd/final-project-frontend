import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthAdminStore from "stores/useAuthAdminStore";
import jwt_decode from "jwt-decode";
import axios from "axios";
import useAdmin from "../../hooks/admin/useAdmin";

export default function TableUser() {
  const api = import.meta.env.VITE_API_HOST;
  const { token } = useAuthAdminStore();
  const { isAuthenticated } = useAuthAdminStore();
  const [citizens, setCitizens] = useState([]);
  const decoded = jwt_decode(token);
  const { getCitizenByHf, isLoading } = useAdmin();

  useEffect(async () => {
    let adminDetail = await getCitizenByHf(token, decoded.user_id);
    setCitizens(adminDetail);
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    // <MuiThemeProvider theme={custom_theme}>
    <MaterialTable
      title="Positioning Actions Column Preview"
      columns={[
        { title: "Name", field: "name" },
        {
          title: "Birthday",
          field: "birthday",
          render: (row) => <span>{formatDate(row.birthday)}</span>,
        },
        { title: "NIK", field: "nik" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: "handphone_number" },
      ]}
      data={citizens}
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
