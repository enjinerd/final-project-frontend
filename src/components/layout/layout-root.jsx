import { BottomNav } from "../bottom-nav";
import Header from "../header";

export const LayoutRoot = ({ children }) => (
  <main className="bg-gray-100 flex flex-col min-h-screen w-full dark:bg-dark">
    <Header />
    {children}
    <BottomNav />
  </main>
);
