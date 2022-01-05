import SideMenu from "../side-menu/SideMenu";

export const LayoutAdmin = ({ children }) => (
  <main className="flex flex-row justify-center w-full min-h-screen">
    <SideMenu />
    {children}
  </main>
);
