import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { todos as initialTodos, currentUser } from "../../data/mockData";
import StatusBadge from "../../components/StatusBadge";

export default function MemberTodos() {
  const [todos, setTodos] = useState(initialTodos);
  const mine = todos.filter((t) => t.assignee === currentUser.fullName);
  const team = todos.filter(
    (t) => t.committee === currentUser.committee && t.assignee !== currentUser.fullName
  );

  function toggleDone(id) {
    setTodos((ts) =>
      ts.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "in_progress" : "done" }
          : t
      )
    );
  }

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-900">
        To-dos
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        Your tasks, plus what the rest of {currentUser.committee} is working on.
      </p>

      <Section title="Assigned to you" items={mine} onToggle={toggleDone} />
      <Section title={`${currentUser.committee} — team tasks`} items={team} />
    </div>
  );
}

function Section({ title, items, onToggle }) {
  return (
    <div className="mt-6 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="font-display mb-4 text-sm font-semibold text-ink-900">
        {title}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-400">Nothing here.</p>
      ) : (
        <div className="divide-y divide-ink-100">
          {items.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-2.5">
                {onToggle ? (
                  <button onClick={() => onToggle(t.id)} className="mt-0.5 shrink-0">
                    {t.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-ink-200" />
                    )}
                  </button>
                ) : t.status === "done" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-200" />
                )}
                <div>
                  <div
                    className={`text-sm ${
                      t.status === "done"
                        ? "text-ink-400 line-through"
                        : "text-ink-700"
                    }`}
                  >
                    {t.title}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-400">
                    Due {t.due} · {t.assignee}
                  </div>
                </div>
              </div>
              <StatusBadge status={t.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
