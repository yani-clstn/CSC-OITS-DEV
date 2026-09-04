import { Hexagon } from "lucide-react";

export default function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
        <Hexagon className="h-4.5 w-4.5 text-white" strokeWidth={2.4} />
      </div>
      <span
        className={`font-display text-[15px] font-semibold tracking-tight ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        CS Clique
      </span>
    </div>
  );
}
