import { useState } from "react";
import { Plus, MapPin, Users, X } from "lucide-react";
import { events as initialEvents, committees } from "../../data/mockData";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OfficerEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);

  function addEvent(newEvent) {
    setEvents((es) => [{ ...newEvent, id: es.length + 1, attendees: 0 }, ...es]);
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink-900">
            Events
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Create events and track member attendance.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New event
        </button>
      </div>

      {showForm && (
        <EventForm onCancel={() => setShowForm(false)} onSubmit={addEvent} />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((e) => (
          <div
            key={e.id}
            className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-medium text-brand-600">
                  {formatDate(e.date)}
                </span>
                <div className="font-display mt-1 text-sm font-semibold text-ink-900">
                  {e.title}
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  e.isPublic
                    ? "bg-brand-100 text-brand-700"
                    : "bg-ink-100 text-ink-500"
                }`}
              >
                {e.isPublic ? "Public" : "Officers only"}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-ink-400">
              <MapPin className="h-3 w-3" /> {e.location}
            </div>
            <p className="mt-3 text-xs text-ink-500">{e.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
              <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] text-ink-500">
                {e.committee}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-500">
                <Users className="h-3.5 w-3.5" /> {e.attendees} attending
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    committee: committees[0],
    isPublic: true,
    description: "",
  });

  function update(field) {
    return (e) =>
      setForm((f) => ({
        ...f,
        [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
  }

  return (
    <div className="mb-6 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-ink-900">
          New event
        </span>
        <button onClick={onCancel} className="text-ink-400 hover:text-ink-700">
          <X className="h-4 w-4" />
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...form, date: new Date(form.date).toISOString() });
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        <input
          required
          placeholder="Event title"
          value={form.title}
          onChange={update("title")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:col-span-2"
        />
        <input
          required
          type="datetime-local"
          value={form.date}
          onChange={update("date")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
        <input
          required
          placeholder="Location"
          value={form.location}
          onChange={update("location")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
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
        <label className="flex items-center gap-2 px-1 text-sm text-ink-700">
          <input type="checkbox" checked={form.isPublic} onChange={update("isPublic")} />
          Visible on public landing page
        </label>
        <textarea
          placeholder="Short description"
          value={form.description}
          onChange={update("description")}
          rows={2}
          className="resize-none rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:col-span-2"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 sm:col-span-2"
        >
          Create event
        </button>
      </form>
    </div>
  );
}
