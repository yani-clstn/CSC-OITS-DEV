import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Logo from "../components/Logo";
import { officers, events } from "../data/mockData";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function PublicLanding() {
  return (
    <div>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm text-ink-500 hover:text-ink-900" href="#officers">
            Officers
          </a>
          <a className="text-sm text-ink-500 hover:text-ink-900" href="#events">
            Events
          </a>
          <a className="text-sm text-ink-500 hover:text-ink-900" href="#join">
            Join us
          </a>
        </div>
        <Link
          to="/member"
          className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          Member login
        </Link>
      </nav>

      {/* hero */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-brand-200 opacity-50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-[-5%] h-72 w-72 rounded-full bg-brand-600 opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-14 text-center">
          <span className="inline-block rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-600">
            CvSU Imus · BSCS Organization
          </span>
          <h1 className="font-display mt-6 text-[40px] font-semibold leading-[1.1] tracking-tight text-ink-900 md:text-5xl">
            We plan firmly, and we act with integrity. 
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-500">
            Computer Science Clique's home for schedules, committee
            to-dos, meeting minutes, and the documents that used to live
            in a dozen different chats.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#events"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(29,78,216,0.5)] hover:bg-brand-700"
            >
              View upcoming events
            </a>
            <a
              href="#officers"
              className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 hover:border-ink-400"
            >
              Meet the officers
            </a>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-6 pb-16">
        {[
          ["120+", "Active members"],
          [String(events.length) + "+", "Events this year"],
          ["6", "Committees"],
        ].map(([n, l]) => (
          <div
            key={l}
            className="rounded-2xl border border-ink-200 bg-white px-4 py-5 text-center shadow-sm"
          >
            <div className="font-display text-2xl font-semibold text-ink-900">
              {n}
            </div>
            <div className="mt-1 text-xs text-ink-500">{l}</div>
          </div>
        ))}
      </div>

      {/* officers */}
      <section id="officers" className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="font-display mb-4 text-lg font-semibold text-ink-900">
          Meet the officers
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {officers.map((o) => (
            <div
              key={o.name}
              className="rounded-2xl border border-ink-200 bg-white p-4 shadow-sm"
            >
              <div className="h-9 w-9 rounded-full bg-brand-100" />
              <div className="font-display mt-3 text-sm font-semibold text-ink-900">
                {o.name}
              </div>
              <div className="text-xs text-ink-500">{o.role}</div>
              <div className="mt-2 inline-block rounded-full bg-ink-100 px-2 py-0.5 text-[11px] text-ink-500">
                {o.committee}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* events */}
      <section id="events" className="mx-auto max-w-4xl px-6 pb-20">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            Upcoming events
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {events
            .filter((e) => e.isPublic)
            .map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-ink-200 bg-white p-4 shadow-sm"
              >
                <span className="text-xs font-medium text-brand-600">
                  {formatDate(e.date)}
                </span>
                <div className="font-display mt-1.5 text-sm font-semibold text-ink-900">
                  {e.title}
                </div>
                <div className="mt-1 text-xs text-ink-400">{e.location}</div>
              </div>
            ))}
        </div>
      </section>

      {/* join us */}
      <section id="join" className="mx-auto max-w-xl px-6 pb-24">
        <h2 className="font-display mb-1 text-lg font-semibold text-ink-900">
          Join the Clique
        </h2>
        <p className="mb-6 text-sm text-ink-500">
          Applications are reviewed by the officer team. You'll hear back
          within a week.
        </p>
        <JoinUsForm />
      </section>
    </div>
  );
}

function JoinUsForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    yearLevel: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In production this posts to an API route that inserts into
    // the `applications` table (see src/db/schema.js).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
        <div>
          <div className="font-display text-sm font-semibold text-green-800">
            Application sent
          </div>
          <p className="mt-1 text-sm text-green-700">
            Thanks, {form.fullName.split(" ")[0] || "there"}! The Internal
            Affairs committee will email you at {form.email || "your address"}{" "}
            once it's reviewed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm"
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-700">
          Full name
        </label>
        <input
          required
          value={form.fullName}
          onChange={update("fullName")}
          placeholder="Juan Dela Cruz"
          className="w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-700">
          Email
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="juan.delacruz@cvsu.edu.ph"
          className="w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-700">
          Year level
        </label>
        <select
          required
          value={form.yearLevel}
          onChange={update("yearLevel")}
          className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          <option value="" disabled>
            Select year level
          </option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-700">
          Why do you want to join?
        </label>
        <textarea
          required
          value={form.reason}
          onChange={update("reason")}
          rows={3}
          placeholder="A couple of sentences is fine."
          className="w-full resize-none rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
      >
        Submit application <ChevronRight className="h-4 w-4" />
      </button>
    </form>
  );
}
