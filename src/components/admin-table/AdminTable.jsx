import MaterialTable, {
  MTableBodyRow,
  MTableHeader,
  MTableToolbar,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-table/core";
import { Rowing } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AdminTable() {
  let datum = useLocation();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (datum.state) {
      setColumns(datum.state.columns);
      setData(datum.state.data);
    }
  }, [datum]);

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
      columns={columns}
      data={data}
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
        {
          icon: () => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="#059669"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          ),
          tooltip: "add new vaccine",
          position: "toolbar",
          onClick: () => {
            console.log("clicked");
          },
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
