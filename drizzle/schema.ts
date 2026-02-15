import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Fixtures table for storing match schedules and results
 */
export const fixtures = mysqlTable("fixtures", {
  id: int("id").autoincrement().primaryKey(),
  opponent: varchar("opponent", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  format: varchar("format", { length: 50 }).notNull().default("Hard Tennis Ball"),
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  ourScore: varchar("ourScore", { length: 50 }),
  ourWickets: varchar("ourWickets", { length: 10 }),
  theirScore: varchar("theirScore", { length: 50 }),
  theirWickets: varchar("theirWickets", { length: 10 }),
  result: varchar("result", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Fixture = typeof fixtures.$inferSelect;
export type InsertFixture = typeof fixtures.$inferInsert;

/**
 * Players table for storing player profiles and statistics
 */
export const players = mysqlTable("players", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"]).notNull(),
  battingStyle: varchar("battingStyle", { length: 50 }),
  bowlingStyle: varchar("bowlingStyle", { length: 50 }),
  jerseyNumber: int("jerseyNumber"),
  photoUrl: text("photoUrl"),
  bio: text("bio"),
  isCaptain: int("isCaptain").default(0).notNull(),
  isImpactPlayer: int("isImpactPlayer").default(0).notNull(),
  runsScored: int("runsScored").default(0).notNull(),
  wicketsTaken: int("wicketsTaken").default(0).notNull(),
  matchesPlayed: int("matchesPlayed").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

/**
 * News table for storing match reports and announcements
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["Match Report", "Announcement", "Selection", "Event", "Other"]).default("Other").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  author: varchar("author", { length: 255 }),
  published: int("published").default(0).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

/**
 * Notifications table for storing system and user notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["info", "success", "warning", "error", "match_alert", "announcement"]).default("info").notNull(),
  icon: varchar("icon", { length: 50 }),
  userId: int("userId"),
  isGlobal: int("isGlobal").default(1).notNull(),
  read: int("read").default(0).notNull(),
  actionUrl: text("actionUrl"),
  actionLabel: varchar("actionLabel", { length: 100 }),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Newsletter subscribers table for storing email subscriptions
 */
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  subscribed: int("subscribed").default(1).notNull(),
  verificationToken: varchar("verificationToken", { length: 255 }),
  verified: int("verified").default(0).notNull(),
  verifiedAt: timestamp("verifiedAt"),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
