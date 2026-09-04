import { useState } from "react";
import { Plus, Search, NotebookPen, X } from "lucide-react";
import { motmEntries as initialEntries, committees } from "../../data/mockData";

export default function OfficerMotm() {
  const [entries, setEntries] = useState(initialEntries);
  const [query, setQuery] = useState("");
  const [committeeFilter, setCommitteeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const visible = entries.filter((m) => {
    const matchesQuery =
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.summary.toLowerCase().includes(query.toLowerCase());
    const matchesCommittee =
      committeeFilter === "All" || m.committee === committeeFilter;
    return matchesQuery && matchesCommittee;
  });

  function addEntry(entry) {
    setEntries((es) => [{ ...entry, id: es.length + 1 }, ...es]);
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink-900">
            Minutes of the Meeting
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Log and search past meeting minutes across all committees.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> Log entry
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search minutes..."
            className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <select
          value={committeeFilter}
          onChange={(e) => setCommitteeFilter(e.target.value)}
          className="rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          {["All", ...committees].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <MotmForm onCancel={() => setShowForm(false)} onSubmit={addEntry} />
      )}

      <div className="space-y-3">
        {visible.length === 0 ? (
          <p className="text-sm text-ink-400">No minutes match your search.</p>
        ) : (
          visible.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <NotebookPen className="h-4 w-4 text-brand-600" />
                  <span className="font-display text-sm font-semibold text-ink-900">
                    {m.title}
                  </span>
                </div>
                <span className="text-xs text-ink-400">
                  {new Date(m.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span className="mt-2 inline-block rounded-full bg-ink-100 px-2 py-0.5 text-[11px] text-ink-500">
                {m.committee}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {m.summary}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function MotmForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    committee: committees[0],
    date: "",
    summary: "",
  });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  return (
    <div className="mb-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-ink-900">
          Log meeting minutes
        </span>
        <button onClick={onCancel} className="text-ink-400 hover:text-ink-700">
          <X className="h-4 w-4" />
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Meeting title (e.g. Officers' Meeting)"
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
        <input
          required
          type="date"
          value={form.date}
          onChange={update("date")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
        <textarea
          required
          placeholder="Summary of what was discussed / decided"
          value={form.summary}
          onChange={update("summary")}
          rows={3}
          className="resize-none rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:col-span-2"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 sm:col-span-2"
        >
          Save entry
        </button>
      </form>
    </div>
  );
}
