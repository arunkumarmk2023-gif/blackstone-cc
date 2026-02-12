import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

// Mock authenticated user context
function createAuthContext(): TrpcContext {
  const user: User = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Content Management APIs", () => {
  const ctx = createAuthContext();
  const caller = appRouter.createCaller(ctx);

  describe("Fixtures API", () => {
    it("should list fixtures and return an array", async () => {
      const fixtures = await caller.fixtures.list();
      expect(Array.isArray(fixtures)).toBe(true);
      // Fixtures should have expected structure
      if (fixtures.length > 0) {
        const fixture = fixtures[0];
        expect(fixture).toHaveProperty("id");
        expect(fixture).toHaveProperty("date");
        expect(fixture).toHaveProperty("opponent");
        expect(fixture).toHaveProperty("venue");
        expect(fixture).toHaveProperty("status");
      }
    });
  });

  describe("Players API", () => {
    it("should list players and return an array", async () => {
      const players = await caller.players.list();
      expect(Array.isArray(players)).toBe(true);
      // Players should have expected structure
      if (players.length > 0) {
        const player = players[0];
        expect(player).toHaveProperty("id");
        expect(player).toHaveProperty("name");
        expect(player).toHaveProperty("role");
        expect(player).toHaveProperty("jerseyNumber");
      }
    });
  });

  describe("News API", () => {
    it("should list news items and return an array", async () => {
      const news = await caller.news.list();
      expect(Array.isArray(news)).toBe(true);
      // News should have expected structure
      if (news.length > 0) {
        const newsItem = news[0];
        expect(newsItem).toHaveProperty("id");
        expect(newsItem).toHaveProperty("title");
        expect(newsItem).toHaveProperty("category");
        expect(newsItem).toHaveProperty("summary");
      }
    });
  });
});
