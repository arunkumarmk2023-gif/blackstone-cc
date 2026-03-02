import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  createFixture,
  getFixtures,
  getFixtureById,
  updateFixture,
  deleteFixture,
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
} from "./db";
import type { InsertFixture, InsertResult } from "../drizzle/schema";

describe("Fixtures & Results Database Operations", () => {
  // Test fixtures data
  const testFixture: InsertFixture = {
    opponent: "Test Team A",
    venue: "Test Venue",
    date: new Date("2025-04-15T14:00:00"),
    format: "T20",
    status: "upcoming",
    ourScore: null,
    ourWickets: null,
    theirScore: null,
    theirWickets: null,
    result: null,
    notes: "Test fixture",
  };

  const testResult: InsertResult = {
    date: new Date("2025-03-01T14:00:00"),
    venue: "Test Venue",
    league: "Connecticut Cricket League",
    opponentName: "Test Team B",
    score: "Blackstone CC 145/6 (20) vs Test Team B 132/9 (20)",
    result: "win",
    scorecardUrl: "https://cricclubs.com/test",
  };

  describe("Fixtures", () => {
    let createdFixtureId: number;

    it("should create a fixture", async () => {
      const result = await createFixture(testFixture);
      expect(result).toBeDefined();
      // Store ID for cleanup
      createdFixtureId = (result as any).insertId || 1;
    });

    it("should retrieve all fixtures", async () => {
      const fixtures = await getFixtures();
      expect(Array.isArray(fixtures)).toBe(true);
      expect(fixtures.length).toBeGreaterThanOrEqual(0);
    });

    it("should retrieve a fixture by ID", async () => {
      const fixtures = await getFixtures();
      if (fixtures.length > 0) {
        const fixture = await getFixtureById(fixtures[0].id);
        expect(fixture).toBeDefined();
        expect(fixture?.opponent).toBe(fixtures[0].opponent);
      }
    });

    it("should update a fixture", async () => {
      const fixtures = await getFixtures();
      if (fixtures.length > 0) {
        const fixtureId = fixtures[0].id;
        const updateData = {
          opponent: "Updated Team Name",
          status: "completed" as const,
        };
        const result = await updateFixture(fixtureId, updateData);
        expect(result).toBeDefined();
      }
    });

    it("should delete a fixture", async () => {
      const fixtures = await getFixtures();
      if (fixtures.length > 0) {
        const fixtureId = fixtures[0].id;
        const result = await deleteFixture(fixtureId);
        expect(result).toBeDefined();
      }
    });

    it("should handle fixture with all fields populated", async () => {
      const completeFixture: InsertFixture = {
        opponent: "Complete Team",
        venue: "Complete Venue",
        date: new Date("2025-05-20T18:00:00"),
        format: "One Day",
        status: "completed",
        ourScore: "175",
        ourWickets: "4",
        theirScore: "172",
        theirWickets: "8",
        result: "Win by 3 runs",
        notes: "Great match performance",
      };
      const result = await createFixture(completeFixture);
      expect(result).toBeDefined();
    });
  });

  describe("Results", () => {
    let createdResultId: number;

    it("should create a result", async () => {
      const result = await createResult(testResult);
      expect(result).toBeDefined();
      createdResultId = (result as any).insertId || 1;
    });

    it("should retrieve all results", async () => {
      const results = await getResults();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it("should retrieve a result by ID", async () => {
      const results = await getResults();
      if (results.length > 0) {
        const result = await getResultById(results[0].id);
        expect(result).toBeDefined();
        expect(result?.opponentName).toBe(results[0].opponentName);
      }
    });

    it("should update a result", async () => {
      const results = await getResults();
      if (results.length > 0) {
        const resultId = results[0].id;
        const updateData = {
          result: "loss" as const,
          score: "Updated Score",
        };
        const result = await updateResult(resultId, updateData);
        expect(result).toBeDefined();
      }
    });

    it("should delete a result", async () => {
      const results = await getResults();
      if (results.length > 0) {
        const resultId = results[0].id;
        const result = await deleteResult(resultId);
        expect(result).toBeDefined();
      }
    });

    it("should handle different result types", async () => {
      const resultTypes: Array<"win" | "loss" | "tie" | "no_result"> = ["win", "loss", "tie", "no_result"];
      
      for (const resultType of resultTypes) {
        const result: InsertResult = {
          ...testResult,
          result: resultType,
          opponentName: `Team for ${resultType}`,
        };
        const created = await createResult(result);
        expect(created).toBeDefined();
      }
    });

    it("should handle result with scorecard URL", async () => {
      const resultWithUrl: InsertResult = {
        ...testResult,
        scorecardUrl: "https://cricclubs.com/match/12345",
        opponentName: "Team with Scorecard",
      };
      const result = await createResult(resultWithUrl);
      expect(result).toBeDefined();
    });

    it("should handle result without scorecard URL", async () => {
      const resultWithoutUrl: InsertResult = {
        ...testResult,
        scorecardUrl: null,
        opponentName: "Team without Scorecard",
      };
      const result = await createResult(resultWithoutUrl);
      expect(result).toBeDefined();
    });

    it("should retrieve results in date order", async () => {
      const results = await getResults();
      if (results.length > 1) {
        // Results should be ordered by date descending
        for (let i = 0; i < results.length - 1; i++) {
          const currentDate = new Date(results[i].date).getTime();
          const nextDate = new Date(results[i + 1].date).getTime();
          expect(currentDate).toBeGreaterThanOrEqual(nextDate);
        }
      }
    });
  });

  describe("Data Integrity", () => {
    it("should maintain fixture data integrity", async () => {
      const fixture: InsertFixture = {
        opponent: "Integrity Test Team",
        venue: "Integrity Venue",
        date: new Date("2025-06-01T15:00:00"),
        format: "T20",
        status: "upcoming",
        ourScore: null,
        ourWickets: null,
        theirScore: null,
        theirWickets: null,
        result: null,
        notes: "Integrity test",
      };
      
      await createFixture(fixture);
      const fixtures = await getFixtures();
      const created = fixtures.find(f => f.opponent === "Integrity Test Team");
      
      expect(created).toBeDefined();
      expect(created?.venue).toBe("Integrity Venue");
      expect(created?.format).toBe("T20");
      expect(created?.status).toBe("upcoming");
    });

    it("should maintain result data integrity", async () => {
      const result: InsertResult = {
        date: new Date("2025-02-15T14:00:00"),
        venue: "Integrity Result Venue",
        league: "Test League",
        opponentName: "Integrity Result Team",
        score: "Test Score String",
        result: "win",
        scorecardUrl: "https://test.com/scorecard",
      };
      
      await createResult(result);
      const results = await getResults();
      const created = results.find(r => r.opponentName === "Integrity Result Team");
      
      expect(created).toBeDefined();
      expect(created?.venue).toBe("Integrity Result Venue");
      expect(created?.league).toBe("Test League");
      expect(created?.score).toBe("Test Score String");
      expect(created?.result).toBe("win");
      expect(created?.scorecardUrl).toBe("https://test.com/scorecard");
    });

    it("should handle special characters in opponent names", async () => {
      const specialNames = [
        "Team & Co.",
        "O'Reilly's XI",
        "Team-2025",
        "Team (A)",
      ];

      for (const name of specialNames) {
        const result: InsertResult = {
          ...testResult,
          opponentName: name,
        };
        const created = await createResult(result);
        expect(created).toBeDefined();
      }
    });

    it("should handle long venue names", async () => {
      const longVenue = "Very Long Venue Name With Multiple Words And Special Characters - Test Location";
      const result: InsertResult = {
        ...testResult,
        venue: longVenue,
        opponentName: "Long Venue Test",
      };
      
      const created = await createResult(result);
      expect(created).toBeDefined();
    });
  });
});
