import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Home from "./pages/Home";
import "./index.css";
import AdminEditor from "@/pages/AdminEditor";
import AdminLogin from "@/pages/AdminLogin";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
	<BrowserRouter>
	  <Routes>
		<Route path="/" element={<Home />} />
		<Route path="/blog" element={<Blog />} />
		<Route path="/blog/:slug" element={<BlogDetail />} />
		<Route path="/admin/editor" element={<AdminEditor />} />
		<Route path="/admin/login" element={<AdminLogin />} />
		{/* TODO: 나중에 Home/Portfolio/Playground 추가 */}
	  </Routes>
	</BrowserRouter>
  </React.StrictMode>
);

