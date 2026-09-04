const STYLES = {
  done: "bg-green-100 text-green-700",
  in_progress: "bg-brand-100 text-brand-700",
  not_started: "bg-ink-100 text-ink-500",
  going: "bg-green-100 text-green-700",
  open: "bg-brand-100 text-brand-700",
  member: "bg-brand-100 text-brand-700",
  officer_only: "bg-amber-100 text-amber-700",
};

const LABELS = {
  done: "Done",
  in_progress: "In progress",
  not_started: "Not started",
  going: "RSVP'd",
  open: "Open",
  member: "Member-visible",
  officer_only: "Officer-only",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
        STYLES[status] ?? "bg-ink-100 text-ink-500"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
