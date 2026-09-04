export const currentUser = {
  fullName: "Althea Reyes",
  role: "officer",
  title: "Assistant Secretary",
  committee: "Executive Board",
};

export const officers = [
  { name: "Marco Villanueva", role: "President", committee: "Executive Board" },
  { name: "Dana Ibarra", role: "Vice President", committee: "Executive Board" },
  { name: "Althea Reyes", role: "Assistant Secretary", committee: "Executive Board" },
  { name: "Josiah Cruz", role: "Treasurer", committee: "Finance" },
  { name: "Elijah Santos", role: "Committee Head", committee: "Internal Affairs" },
  { name: "Nicole Fajardo", role: "Committee Head", committee: "Publicity" },
];

export const events = [
  {
    id: 1,
    title: "General Assembly — 1st Sem",
    date: "2026-09-12T15:00:00",
    location: "CvSU Auditorium",
    committee: "Executive Board",
    isPublic: true,
    attendees: 118,
    description:
      "Mandatory assembly covering officer reports, membership renewal, and the Hackathon 2026 announcement.",
  },
  {
    id: 2,
    title: "Hackathon 2026: Build Week",
    date: "2026-09-20T09:00:00",
    location: "Computer Laboratory 3",
    committee: "Technical",
    isPublic: true,
    attendees: 64,
    description: "24-hour build sprint. Teams of 3–4, open theme, prizes for top 3.",
  },
  {
    id: 3,
    title: "Officers' Retreat",
    date: "2026-10-03T08:00:00",
    location: "TBA",
    committee: "Executive Board",
    isPublic: false,
    attendees: 14,
    description: "Planning session for 2nd semester roadmap and budget review.",
  },
  {
    id: 4,
    title: "Git & GitHub Workshop",
    date: "2026-09-27T13:00:00",
    location: "Computer Laboratory 1",
    committee: "Technical",
    isPublic: true,
    attendees: 41,
    description: "Beginner-friendly workshop on branching, PRs, and resolving merge conflicts.",
  },
];

export const todos = [
  {
    id: 1,
    title: "Finalize GA venue reservation",
    committee: "External Affairs",
    assignee: "Dana Ibarra",
    due: "Sep 8",
    status: "in_progress",
  },
  {
    id: 2,
    title: "Draft sponsorship letter for Hackathon",
    committee: "Finance",
    assignee: "Josiah Cruz",
    due: "Sep 9",
    status: "in_progress",
  },
  {
    id: 3,
    title: "Print membership IDs for new members",
    committee: "Internal Affairs",
    assignee: "Elijah Santos",
    due: "Sep 11",
    status: "not_started",
  },
  {
    id: 4,
    title: "Post GA reminder on social pages",
    committee: "Publicity",
    assignee: "Nicole Fajardo",
    due: "Sep 11",
    status: "done",
  },
  {
    id: 5,
    title: "Prep registration table & sign-in sheet",
    committee: "Internal Affairs",
    assignee: "Althea Reyes",
    due: "Sep 12",
    status: "not_started",
  },
  {
    id: 6,
    title: "Reconcile Hackathon budget vs. actuals",
    committee: "Finance",
    assignee: "Josiah Cruz",
    due: "Sep 22",
    status: "not_started",
  },
];

export const motmEntries = [
  {
    id: 1,
    title: "Officers' Meeting",
    committee: "Executive Board",
    date: "2026-08-28",
    summary:
      "Approved Hackathon 2026 budget of ₱18,500. Assigned venue booking to External Affairs. Reviewed GA agenda draft.",
  },
  {
    id: 2,
    title: "Internal Affairs Sync",
    committee: "Internal Affairs",
    date: "2026-08-25",
    summary:
      "Discussed membership renewal drive targets (150 members) and ID printing timeline ahead of GA.",
  },
  {
    id: 3,
    title: "Budget Review",
    committee: "Finance",
    date: "2026-08-20",
    summary:
      "Walked through Q1 organizational fund balance. Flagged pending reimbursements from the June orientation.",
  },
  {
    id: 4,
    title: "Publicity Planning",
    committee: "Publicity",
    date: "2026-08-15",
    summary:
      "Finalized content calendar for September: GA teaser, Hackathon countdown series, workshop reminders.",
  },
];

export const documents = [
  {
    id: 1,
    title: "Membership Application Form 2026",
    category: "Forms",
    type: "PDF",
    visibility: "member",
    uploadedBy: "Elijah Santos",
    date: "Aug 2, 2026",
  },
  {
    id: 2,
    title: "General Assembly — Slide Deck",
    category: "Presentations",
    type: "PPTX",
    visibility: "member",
    uploadedBy: "Nicole Fajardo",
    date: "Sep 1, 2026",
  },
  {
    id: 3,
    title: "Org Constitution and By-Laws (Rev. 3)",
    category: "Governance",
    type: "DOCX",
    visibility: "member",
    uploadedBy: "Marco Villanueva",
    date: "Jul 14, 2026",
  },
  {
    id: 4,
    title: "Hackathon 2026 Budget Breakdown",
    category: "Finance",
    type: "XLSX",
    visibility: "officer_only",
    uploadedBy: "Josiah Cruz",
    date: "Aug 29, 2026",
  },
  {
    id: 5,
    title: "Officer Onboarding Guide",
    category: "Governance",
    type: "PDF",
    visibility: "officer_only",
    uploadedBy: "Dana Ibarra",
    date: "Jun 20, 2026",
  },
];

export const committees = [
  "Executive Board",
  "Internal Affairs",
  "External Affairs",
  "Finance",
  "Publicity",
  "Technical",
];
