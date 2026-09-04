import { useState } from "react";
import { UploadCloud, FileText, Search, X } from "lucide-react";
import { documents as initialDocs } from "../../data/mockData";
import StatusBadge from "../../components/StatusBadge";

const CATEGORIES = ["Forms", "Presentations", "Governance", "Finance", "Resources"];

export default function OfficerDocuments() {
  const [docs, setDocs] = useState(initialDocs);
  const [query, setQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const visible = docs.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  function addDoc(doc) {
    setDocs((ds) => [{ ...doc, id: ds.length + 1, date: "Just now" }, ...ds]);
    setShowUpload(false);
  }

  function toggleVisibility(id) {
    setDocs((ds) =>
      ds.map((d) =>
        d.id === id
          ? {
              ...d,
              visibility: d.visibility === "member" ? "officer_only" : "member",
            }
          : d
      )
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink-900">
            Document repository
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Upload, tag, and control who can see each file. Click a
            visibility pill to toggle it.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <UploadCloud className="h-4 w-4" /> Upload
        </button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {showUpload && (
        <UploadForm onCancel={() => setShowUpload(false)} onSubmit={addDoc} />
      )}

      <div className="divide-y divide-ink-100 rounded-2xl border border-ink-200 bg-white shadow-sm">
        {visible.map((d) => (
          <div key={d.id} className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                <FileText className="h-4 w-4 text-brand-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-ink-900">{d.title}</div>
                <div className="text-xs text-ink-400">
                  {d.category} · {d.type} · {d.uploadedBy} · {d.date}
                </div>
              </div>
            </div>
            <button onClick={() => toggleVisibility(d.id)}>
              <StatusBadge status={d.visibility} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    type: "PDF",
    visibility: "member",
    uploadedBy: "You",
  });
  const [fileName, setFileName] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  return (
    <div className="mb-5 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-ink-900">
          Upload document
        </span>
        <button onClick={onCancel} className="text-ink-400 hover:text-ink-700">
          <X className="h-4 w-4" />
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...form, title: form.title || fileName });
        }}
        className="grid gap-3 sm:grid-cols-2"
      >
        <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-ink-200 py-6 text-center hover:border-brand-400 sm:col-span-2">
          <UploadCloud className="h-5 w-5 text-ink-400" />
          <span className="text-xs text-ink-500">
            {fileName || "Click to choose a file, or drag it here"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFileName(f.name);
                const ext = f.name.split(".").pop()?.toUpperCase();
                setForm((form) => ({ ...form, type: ext || "PDF" }));
              }
            }}
          />
        </label>
        <input
          placeholder="Document title (defaults to file name)"
          value={form.title}
          onChange={update("title")}
          className="rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:col-span-2"
        />
        <select
          value={form.category}
          onChange={update("category")}
          className="rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={form.visibility}
          onChange={update("visibility")}
          className="rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          <option value="member">Member-visible</option>
          <option value="officer_only">Officer-only</option>
        </select>
        <button
          type="submit"
          className="rounded-full bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700 sm:col-span-2"
        >
          Save document
        </button>
      </form>
    </div>
  );
}
