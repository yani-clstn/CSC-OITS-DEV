import { Outlet } from "react-router-dom";
import MemberTopNav from "../../components/MemberTopNav";

export default function MemberLayout() {
  return (
    <div className="min-h-screen bg-ink-50">
      <MemberTopNav />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}
