import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteProfile } from "@/config/site";
import ThemeToggle from "./ThemeToggle"
import profileImg from "@/assets/profile/profile.jpg";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/dev-log", label: "Dev Log" },
  { to: "/playground", label: "Playground" },
//   { to: "/resume", label: "Resume" },
];

export default function Sidebar() {
  const { name, role, bio, links } = siteProfile;

  return (
    <aside className="hidden md:flex md:w-80 md:flex-col md:border-r md:bg-muted">
      <div className="flex h-full flex-col px-5 py-6">
        {/* ✅ Profile (center aligned) */}
        <div className="flex flex-col items-center text-center space-y-4">
            <img
              src={profileImg}
              alt="JungHo Kim profile"
              className="h-40 w-40 rounded-full object-cover shadow-sm"
            />

          <div className="space-y-1">
            <div className="text-lg font-semibold leading-tight">{name}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {bio}
          </p>

          {/* ✅ SNS icons (center aligned) */}
          <div className="flex items-center justify-center gap-4">
            <a
            //   href={links.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href={links.email}
              className="text-muted-foreground hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="my-6 border-t" />

        {/* Nav */}
        <div className="mt-6 rounded-xl px-1 py-2">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {({ isActive }) => (
                  <Button
                    className="w-full justify-start px-3"
                    variant={isActive ? "default" : "ghost"} // ✅ secondary 말고 ghost
                  >
                    {item.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        

        <div className="mt-auto flex flex-col items-center gap-4 pt-6">
          <ThemeToggle />
        
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} kjh-web-prj
          </div>
        </div>
      </div>
    </aside>
  );
}
