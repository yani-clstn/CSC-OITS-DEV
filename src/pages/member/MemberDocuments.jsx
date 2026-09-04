import { useState } from "react";
import { FileText, Search, Download } from "lucide-react";
import { documents } from "../../data/mockData";

export default function MemberDocuments() {
  const [query, setQuery] = useState("");
  const visible = documents.filter(
    (d) =>
      d.visibility === "member" &&
      d.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-900">
        Documents
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        Approved forms, announcements, and resources shared by officers.
      </p>

      <div className="relative mt-5 max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="mt-5 divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-white shadow-sm">
        {visible.length === 0 ? (
          <p className="p-5 text-sm text-ink-400">No documents match.</p>
        ) : (
          visible.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                  <FileText className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink-900">
                    {d.title}
                  </div>
                  <div className="text-xs text-ink-400">
                    {d.category} · {d.type} · uploaded {d.date}
                  </div>
                </div>
              </div>
              <button className="rounded-full p-2 text-ink-400 hover:bg-ink-50 hover:text-brand-600">
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
