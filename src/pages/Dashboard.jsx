import AdminTable from "../components/admin-table/AdminTable";
import SideMenu from "../components/side-menu/SideMenu";

export function Dashboard() {
  return (
    <div className="dashboard">
      <SideMenu />
      <AdminTable />
    </div>
  );
}
