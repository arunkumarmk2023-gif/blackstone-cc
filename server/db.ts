import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, fixtures, InsertFixture, players, InsertPlayer, news, InsertNews, notifications, InsertNotification, newsletterSubscribers, InsertNewsletterSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Fixtures queries
export async function getFixtures() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(fixtures).orderBy(desc(fixtures.date));
}

export async function getFixtureById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(fixtures).where(eq(fixtures.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createFixture(fixture: InsertFixture) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(fixtures).values(fixture);
  return result;
}

export async function updateFixture(id: number, fixture: Partial<InsertFixture>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(fixtures).set(fixture).where(eq(fixtures.id, id));
}

export async function deleteFixture(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(fixtures).where(eq(fixtures.id, id));
}

// Players queries
export async function getPlayers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(players).orderBy(players.jerseyNumber);
}

export async function getPlayerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(players).where(eq(players.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPlayer(player: InsertPlayer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(players).values(player);
  return result;
}

export async function updatePlayer(id: number, player: Partial<InsertPlayer>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(players).set(player).where(eq(players.id, id));
}

export async function deletePlayer(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(players).where(eq(players.id, id));
}

// News queries
export async function getNews() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(news).where(eq(news.published, 1)).orderBy(desc(news.publishedAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createNews(newsItem: InsertNews) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(news).values(newsItem);
  return result;
}

export async function updateNews(id: number, newsItem: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(news).set(newsItem).where(eq(news.id, id));
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(news).where(eq(news.id, id));
}

// Notifications queries
export async function getNotifications(userId?: number) {
  const db = await getDb();
  if (!db) return [];
  if (userId) {
    return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt));
  }
  return await db.select().from(notifications).where(eq(notifications.isGlobal, 1)).orderBy(desc(notifications.createdAt));
}

export async function createNotification(notification: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(notifications).values(notification);
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(notifications).set({ read: 1 }).where(eq(notifications.id, id));
}

// Newsletter subscribers queries
export async function subscribeNewsletter(subscriber: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(newsletterSubscribers).values(subscriber);
}

export async function getNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.subscribed, 1));
}

export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(newsletterSubscribers).set({ subscribed: 0, unsubscribedAt: new Date() }).where(eq(newsletterSubscribers.email, email));
}

export async function deleteNewsletterSubscriber(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
}
