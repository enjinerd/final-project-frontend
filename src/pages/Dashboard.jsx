import { SideMenu } from "@/components/side-menu";
import { AdminTable } from "@/components/admin-table";

export function Dashboard () {
    return (
        <div className="dashboard">
            <SideMenu/>
            <AdminTable/>
        </div>
    );
}