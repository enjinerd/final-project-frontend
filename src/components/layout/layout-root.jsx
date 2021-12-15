import Header from "../header";
import { BottomNav } from "../bottom-nav";

export const LayoutRoot = ({ children }) => (
  <main className="flex flex-col w-full min-h-screen bg-gray-100">
    <Header />
    {children}
    <BottomNav />
  </main>
);
