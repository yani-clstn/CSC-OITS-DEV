import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { todos as initialTodos, committees, officers } from "../../data/mockData";
import StatusBadge from "../../components/StatusBadge";

const STATUS_CYCLE = ["not_started", "in_progress", "done"];

export default function OfficerTodos() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const visible =
    filter === "All" ? todos : todos.filter((t) => t.committee === filter);

  function cycleStatus(id) {
    setTodos((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t;
        const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(t.status) + 1) % 3];
        return { ...t, status: next };
      })
    );
  }

  function addTodo(newTodo) {
    setTodos((ts) => [{ ...newTodo, id: ts.length + 1, status: "not_started" }, ...ts]);
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink-900">
            Cross-committee to-dos
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Click a status pill to move a task forward. Filter by committee below.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Assign task
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {["All", ...committees].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === c
                ? "bg-ink-900 text-white"
                : "bg-white text-ink-500 border border-ink-200 hover:border-ink-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {showForm && (
        <TodoForm onCancel={() => setShowForm(false)} onSubmit={addTodo} />
      )}

      <div className="divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-white shadow-sm">
        {visible.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="text-sm font-medium text-ink-900">{t.title}</div>
              <div className="mt-1 flex items-center gap-2 text-xs text-ink-400">
                <span className="rounded-full bg-ink-100 px-2 py-0.5 text-ink-500">
                  {t.committee}
                </span>
                <span>{t.assignee}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Due {t.due}
                </span>
              </div>
            </div>
            <button onClick={() => cycleStatus(t.id)}>
              <StatusBadge status={t.status} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodoForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    committee: committees[0],
    assignee: officers[0].name,
    due: "",
  });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  return (
    <div className="mb-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Task title"
          value={form.title}
          onChange={update("title")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:col-span-2"
        />
        <select
          value={form.committee}
          onChange={update("committee")}
          className="rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          {committees.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={form.assignee}
          onChange={update("assignee")}
          className="rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          {officers.map((o) => (
            <option key={o.name}>{o.name}</option>
          ))}
        </select>
        <input
          required
          placeholder="Due (e.g. Sep 15)"
          value={form.due}
          onChange={update("due")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:col-span-2"
        />
        <div className="flex gap-2 sm:col-span-2">
          <button
            type="submit"
            className="flex-1 rounded-full bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            Assign
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-500 hover:border-ink-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
