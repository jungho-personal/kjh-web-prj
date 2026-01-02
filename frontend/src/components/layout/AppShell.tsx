import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppShell() {
  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      {/* TopNav */}
      <TopNav />

      {/* Body */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left sidebar (fixed on desktop) */}
        <Sidebar />

        {/* Right content (scrollable) */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
