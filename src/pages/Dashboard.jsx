import SideMenu from "../components/side-menu/SideMenu";
import AdminTable from "../components/admin-table/AdminTable";

export function Dashboard () {
    return (
        <div className="dashboard">
            <SideMenu/>
            <AdminTable/>
        </div>
    );
}
