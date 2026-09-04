import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ListChecks,
  NotebookPen,
  FileText,
  Users,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Logo from "./Logo";
import { currentUser } from "../data/mockData";

const NAV = [
  { to: "/officer", end: true, icon: LayoutDashboard, label: "Overview" },
  { to: "/officer/events", icon: CalendarDays, label: "Events" },
  { to: "/officer/todos", icon: ListChecks, label: "To-do" },
  { to: "/officer/motm", icon: NotebookPen, label: "MOTM" },
  { to: "/officer/documents", icon: FileText, label: "Documents" },
  { to: "/officer/members", icon: Users, label: "Members" },
];

export default function OfficerSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-ink-200 bg-ink-900 py-5 transition-all ${
        collapsed ? "w-[68px] px-3" : "w-56 px-4"
      }`}
    >
      <div className="mb-8 flex items-center justify-between px-1">
        {!collapsed && <Logo dark />}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-md p-1 text-ink-400 hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="space-y-1">
        {NAV.map((n) => (
          <NavLink
            key={n.label}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-ink-400 hover:bg-white/5 hover:text-white"
              }`
            }
            title={collapsed ? n.label : undefined}
          >
            <n.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{n.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div
        className={`mt-auto flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2.5 ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <div className="h-7 w-7 shrink-0 rounded-full bg-brand-600" />
        {!collapsed && (
          <div>
            <div className="text-xs font-medium text-white">
              {currentUser.fullName}
            </div>
            <div className="text-[11px] text-ink-400">{currentUser.title}</div>
          </div>
        )}
      </div>
    </aside>
  );
}
