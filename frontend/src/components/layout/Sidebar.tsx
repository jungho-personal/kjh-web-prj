import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteProfile } from "@/config/site";

export default function Sidebar() {
  const { name, role, bio, avatarUrl, links } = siteProfile;
  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:border-r md:bg-background">
      <div className="flex h-full flex-col px-5 py-6">
        {/* Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="h-12 w-12 rounded-2xl border object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-2xl border bg-muted" />
            )}

            <div>
              <div className="font-semibold leading-tight">{name}</div>
              <div className="text-xs text-muted-foreground">{role}</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{bio}</p>

          {/* SNS icons */}
          <div className="flex items-center gap-3">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>

            <a
              href={links.email}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        <div className="my-6 border-t" />


        {/* Quick buttons (TopNav와 중복 허용) */}
        <div className="space-y-2">
           <NavLink to="/portfolio">
            {({ isActive }) => (
              <Button className="w-full justify-start" variant={isActive ? "default" : "secondary"}>
                Portfolio
              </Button>
            )}
          </NavLink>
          <NavLink to="/blog">
            {({ isActive }) => (
              <Button className="w-full justify-start" variant={isActive ? "default" : "secondary"}>
                Blog
              </Button>
            )}
          </NavLink>
          <NavLink to="/dev-log">
            {({ isActive }) => (
              <Button className="w-full justify-start" variant={isActive ? "default" : "secondary"}>
                Dev Log
              </Button>
            )}
          </NavLink>
          <NavLink to="/playground">
            {({ isActive }) => (
              <Button className="w-full justify-start" variant={isActive ? "default" : "secondary"}>
                Playground
              </Button>
            )}
          </NavLink>
        </div>

        <div className="mt-auto pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} kjh-web-prj
        </div>
      </div>
    </aside>
  );
}
