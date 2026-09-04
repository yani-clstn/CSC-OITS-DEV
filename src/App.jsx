import { Routes, Route } from "react-router-dom";
import PublicLanding from "./pages/PublicLanding";

import MemberLayout from "./pages/member/MemberLayout";
import MemberOverview from "./pages/member/MemberOverview";
import MemberEvents from "./pages/member/MemberEvents";
import MemberTodos from "./pages/member/MemberTodos";
import MemberDocuments from "./pages/member/MemberDocuments";

import OfficerLayout from "./pages/officer/OfficerLayout";
import OfficerOverview from "./pages/officer/OfficerOverview";
import OfficerEvents from "./pages/officer/OfficerEvents";
import OfficerTodos from "./pages/officer/OfficerTodos";
import OfficerMotm from "./pages/officer/OfficerMotm";
import OfficerDocuments from "./pages/officer/OfficerDocuments";
import OfficerMembers from "./pages/officer/OfficerMembers";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLanding />} />

      <Route path="/member" element={<MemberLayout />}>
        <Route index element={<MemberOverview />} />
        <Route path="events" element={<MemberEvents />} />
        <Route path="todos" element={<MemberTodos />} />
        <Route path="documents" element={<MemberDocuments />} />
      </Route>

      <Route path="/officer" element={<OfficerLayout />}>
        <Route index element={<OfficerOverview />} />
        <Route path="events" element={<OfficerEvents />} />
        <Route path="todos" element={<OfficerTodos />} />
        <Route path="motm" element={<OfficerMotm />} />
        <Route path="documents" element={<OfficerDocuments />} />
        <Route path="members" element={<OfficerMembers />} />
      </Route>
    </Routes>
  );
}
