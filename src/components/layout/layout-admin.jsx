import SideMenu from "../side-menu/SideMenu";

export const LayoutAdmin = ({ children }) => (
  <main className="flex flex-row flex-1 w-full min-h-screen justify-center">
    <SideMenu />
    {children}
  </main>
);
