import { useState } from "react";
import {
  CalendarDays,
  ListChecks,
  FolderOpen,
  FileText,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { events, todos, documents, currentUser } from "../../data/mockData";
import StatusBadge from "../../components/StatusBadge";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function MemberOverview() {
  const [rsvps, setRsvps] = useState({ 1: true }); // eventId -> going
  const myTodos = todos.filter((t) => t.assignee === currentUser.fullName);

  function toggleRsvp(id) {
    setRsvps((r) => ({ ...r, [id]: !r[id] }));
  }

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-900">
        Hey, {currentUser.fullName.split(" ")[0]} 
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        Here's what's happening in CSC this week.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          {/* upcoming events */}
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-brand-600" />
                <span className="font-display text-sm font-semibold text-ink-900">
                  Upcoming events
                </span>
              </div>
              <Link
                to="/member/events"
                className="text-xs text-brand-600 hover:underline"
              >
                See all
              </Link>
            </div>
            <div className="space-y-3">
              {events.slice(0, 2).map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-xl bg-ink-50 px-3.5 py-3"
                >
                  <div>
                    <div className="text-sm font-medium text-ink-900">
                      {e.title}
                    </div>
                    <div className="text-xs text-ink-400">
                      {formatDate(e.date)} · {e.location}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleRsvp(e.id)}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                      rsvps[e.id]
                        ? "bg-green-100 text-green-700"
                        : "bg-brand-600 text-white hover:bg-brand-700"
                    }`}
                  >
                    {rsvps[e.id] ? "You're going" : "RSVP"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* documents preview */}
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-brand-600" />
              <span className="font-display text-sm font-semibold text-ink-900">
                Shared documents
              </span>
            </div>
            <div className="space-y-2.5">
              {documents
                .filter((d) => d.visibility === "member")
                .slice(0, 3)
                .map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-2.5 rounded-xl px-2 py-2 hover:bg-ink-50"
                  >
                    <FileText className="h-4 w-4 text-ink-400" />
                    <span className="text-sm text-ink-700">{d.title}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* my tasks */}
        <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-brand-600" />
            <span className="font-display text-sm font-semibold text-ink-900">
              My to-dos
            </span>
          </div>
          {myTodos.length === 0 ? (
            <p className="text-sm text-ink-400">
              Nothing assigned to you right now.
            </p>
          ) : (
            <div className="space-y-3">
              {myTodos.map((t) => (
                <div key={t.id} className="flex items-start gap-2.5">
                  {t.status === "done" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-200" />
                  )}
                  <div className="flex-1">
                    <span
                      className={`text-sm ${
                        t.status === "done"
                          ? "text-ink-400 line-through"
                          : "text-ink-700"
                      }`}
                    >
                      {t.title}
                    </span>
                    <div className="mt-1">
                      <StatusBadge status={t.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
