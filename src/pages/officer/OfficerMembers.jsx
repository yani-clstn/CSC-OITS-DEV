import { officers, committees } from "../../data/mockData";

export default function OfficerMembers() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-900">
        Members
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        Officers and committee heads. Full member roster wiring pending.
      </p>

      <div className="mt-6 space-y-6">
        {committees.map((c) => {
          const members = officers.filter((o) => o.committee === c);
          if (members.length === 0) return null;
          return (
            <div key={c}>
              <div className="mb-2.5 text-xs font-medium uppercase tracking-wide text-ink-400">
                {c}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {members.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 shadow-sm"
                  >
                    <div className="h-9 w-9 shrink-0 rounded-full bg-brand-100" />
                    <div>
                      <div className="text-sm font-medium text-ink-900">
                        {m.name}
                      </div>
                      <div className="text-xs text-ink-500">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
