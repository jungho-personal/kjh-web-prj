import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full">
        {/* Left sidebar */}
        <Sidebar />

        {/* Right content (scrollable) */}
        <div className="flex-1 overflow-y-auto">
          {/* ✅ 여기서 “전체 폭을 Sidebar 다음부터 꽉” 쓰게 만든다 */}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
