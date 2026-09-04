import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { events } from "../../data/mockData";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function MemberEvents() {
  const [rsvps, setRsvps] = useState({ 1: true });

  function toggleRsvp(id) {
    setRsvps((r) => ({ ...r, [id]: !r[id] }));
  }

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-900">
        Events
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        RSVP to events you plan on attending.
      </p>

      <div className="mt-6 space-y-3">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-ink-900">
                  {e.title}
                </div>
                <div className="mt-1 text-xs text-ink-500">
                  {formatDate(e.date)}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-ink-400">
                  <MapPin className="h-3 w-3" /> {e.location}
                </div>
                <p className="mt-2 max-w-md text-xs text-ink-500">
                  {e.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleRsvp(e.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
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
  );
}
