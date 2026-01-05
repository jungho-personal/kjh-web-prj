import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";

import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import AdminEditor from "@/pages/AdminEditor";
import AdminLogin from "@/pages/AdminLogin";
import Portfolio from "@/pages/Portfolio";
import PortfolioDetail from "@/pages/PortfolioDetail";
import DevLog from "@/pages/DevLog";
import DevLogDetail from "@/pages/DevLogDetail";
import Resume from "@/pages/Resume";
import Playground from "@/pages/Playground";

export default function App() {
  return (
    <Routes>
      {/* AppShell 밖 */}
	  {/* Admin */}
      <Route path="admin/login" element={<AdminLogin />} />

      {/* AppShell 안 */}
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />} />

        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />

        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<PortfolioDetail />} />

        <Route path="dev-log" element={<DevLog />} />
        <Route path="dev-log/:slug" element={<DevLogDetail />} />

		<Route path="/resume" element={<Resume />} />

        <Route path="/playground" element={<Playground />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />

        {/* create */}
        <Route path="__admin__/editor" element={<AdminEditor />} />
        {/* edit (detail -> editor 진입) */}
        <Route path="__admin__/editor/:section/:slug" element={<AdminEditor />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
