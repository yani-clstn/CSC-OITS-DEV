import { Link } from "react-router-dom";
import {
  CalendarDays,
  ListChecks,
  NotebookPen,
  FileText,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { events, todos, motmEntries, documents } from "../../data/mockData";

export default function OfficerOverview() {
  const openTodos = todos.filter((t) => t.status !== "done");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Everything the officer team is tracking right now.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={CalendarDays} label="Upcoming events" value={events.length} />
        <StatCard icon={ListChecks} label="Open to-dos" value={openTodos.length} />
        <StatCard icon={NotebookPen} label="MOTM logged" value={motmEntries.length} />
        <StatCard icon={FileText} label="Documents" value={documents.length} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* to-dos */}
        <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-ink-900">
              Committee to-dos
            </span>
            <Link to="/officer/todos" className="text-xs text-brand-600 hover:underline">
              View board
            </Link>
          </div>
          <div className="divide-y divide-ink-100">
            {todos.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium text-ink-900">{t.title}</div>
                  <div className="text-xs text-ink-400">{t.committee}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-ink-400">
                    <Clock className="h-3 w-3" /> {t.due}
                  </span>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* motm */}
        <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-brand-600" />
            <span className="font-display text-sm font-semibold text-ink-900">
              Recent MOTM
            </span>
          </div>
          <div className="space-y-3.5">
            {motmEntries.slice(0, 3).map((m) => (
              <Link
                to="/officer/motm"
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-ink-50 px-3.5 py-3 hover:bg-ink-100"
              >
                <div>
                  <div className="text-sm font-medium text-ink-900">
                    {m.title} — {new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                  <div className="text-xs text-ink-400">{m.committee}</div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
