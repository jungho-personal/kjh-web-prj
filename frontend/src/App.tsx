import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/admin/editor" element={<AdminEditor />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/dev-log" element={<DevLog />} />
        <Route path="/dev-log/:slug" element={<DevLogDetail />} />
      </Route>
    </Routes>
  );
}