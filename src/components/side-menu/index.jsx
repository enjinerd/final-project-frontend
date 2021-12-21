import AdminTable from "../admin-table/index";

export function SideMenu () {
    return (
        <div className="side-menu">
            <div className="menu">
                <div className="profile">
                    <img src="" alt="" />
                    <p className="username">Yustina Yasin</p>
                </div>
                <div className="menu-wrapper">
                    <p className="menu">vaccines</p>
                    <p className="menu">vaccination session</p>
                    <p className="menu">users</p>
                </div>
            </div>
        </div>
    );
}