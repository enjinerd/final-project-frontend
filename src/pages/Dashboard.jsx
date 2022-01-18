import AdminTable from "../components/table-vaccine/TableVaccine";
import SideMenu from "../components/side-menu/SideMenu";

export function Dashboard() {
  return (
    <div className="dashboard">
      <SideMenu />
      <AdminTable />
    </div>
  );
}
