import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * Roles gate the three tiers of the app:
 *  - "public"  -> unauthenticated visitors (no row in `users`)
 *  - "member"  -> logged-in org member
 *  - "officer" -> logged-in officer / committee head (role-gated dashboard)
 */
export const roleEnum = pgEnum("role", ["member", "officer"]);

export const committeeEnum = pgEnum("committee", [
  "Executive Board",
  "Internal Affairs",
  "External Affairs",
  "Finance",
  "Publicity",
  "Technical",
]);

export const todoStatusEnum = pgEnum("todo_status", [
  "not_started",
  "in_progress",
  "done",
]);

export const docVisibilityEnum = pgEnum("doc_visibility", [
  "member",
  "officer_only",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("member"),
  committee: committeeEnum("committee"),
  studentNumber: varchar("student_number", { length: 40 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// "Join Us" applications submitted from the public landing page,
// reviewed by officers before an account is created.
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  yearLevel: varchar("year_level", { length: 40 }),
  reason: text("reason"),
  status: varchar("status", { length: 20 }).default("pending"), // pending | accepted | rejected
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 160 }),
  startsAt: timestamp("starts_at").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  committee: committeeEnum("committee"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  attended: boolean("attended").default(false),
  respondedAt: timestamp("responded_at").defaultNow().notNull(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  committee: committeeEnum("committee").notNull(),
  assignedTo: integer("assigned_to").references(() => users.id),
  status: todoStatusEnum("status").default("not_started").notNull(),
  dueDate: timestamp("due_date"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const motm = pgTable("motm", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  committee: committeeEnum("committee").notNull(),
  meetingDate: timestamp("meeting_date").notNull(),
  content: text("content").notNull(),
  loggedBy: integer("logged_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 80 }),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 20 }),
  visibility: docVisibilityEnum("visibility").default("member").notNull(),
  uploadedBy: integer("uploaded_by").references(() => users.id),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});
