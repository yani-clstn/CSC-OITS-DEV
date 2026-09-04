import { NavLink } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import Logo from "./Logo";
import { currentUser } from "../data/mockData";

const LINKS = [
  { to: "/member", end: true, label: "Overview" },
  { to: "/member/events", label: "Events" },
  { to: "/member/todos", label: "To-dos" },
  { to: "/member/documents", label: "Documents" },
];

export default function MemberTopNav() {
  return (
    <nav className="flex items-center justify-between border-b border-ink-200 bg-white px-6 py-3.5">
      <div className="flex items-center gap-8">
        <Logo />
        <div className="hidden items-center gap-5 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-brand-600" : "text-ink-500 hover:text-ink-900"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Search className="h-4 w-4 text-ink-400" />
        <Bell className="h-4 w-4 text-ink-400" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-brand-100" />
          <span className="text-sm font-medium text-ink-700">
            {currentUser.fullName.split(" ")[0]}
          </span>
        </div>
      </div>
    </nav>
  );
}
