import { Outlet } from "react-router-dom";
import OfficerSidebar from "../../components/OfficerSidebar";

export default function OfficerLayout() {
  return (
    <div className="flex bg-ink-50">
      <OfficerSidebar />
      <main className="flex-1 px-8 py-7">
        <Outlet />
      </main>
    </div>
  );
}
