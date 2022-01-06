import { BottomNav } from "../bottom-nav";
import Header from "../header";

export const LayoutRoot = ({ children }) => (
  <main className="flex flex-col w-full min-h-screen bg-gray-100">
    <Header />
    {children}
    <BottomNav />
  </main>
);
