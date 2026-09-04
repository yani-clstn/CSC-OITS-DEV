export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-sm">
      <Icon className="h-4 w-4 text-brand-600" />
      <div className="font-display mt-3 text-2xl font-semibold text-ink-900">
        {value}
      </div>
      <div className="mt-0.5 text-xs text-ink-500">{label}</div>
    </div>
  );
}
