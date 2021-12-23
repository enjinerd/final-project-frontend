import "./styles.css";

export default function SideMenu () {
    return (
        <div className="side-menu">
                <div className="profile flex flex-col justify-center items-center">
                    <img src="" alt="" />
                    <p className="username">Yustina Yasin</p>
                </div>
                <div className="artboard menus">
                    <ul className="menu p-4">
                        <li>
                            <a>
                                Vaccines
                            </a>
                        </li> 
                        <li>
                            <a>
                                Vaccination Sessions
                            </a>
                        </li> 
                        <li>
                            <a>
                                Users
                            </a>
                        </li> 
                    </ul>
                </div>
        </div>
    );
}