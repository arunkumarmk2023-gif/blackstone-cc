import { describe, it, expect, beforeEach } from "vitest";
import {
  createFixture,
  deleteFixture,
  getFixtures,
  createResult,
  deleteResult,
  getResults,
} from "./db";
import type { InsertFixture, InsertResult } from "../drizzle/schema";

describe("Delete Mutations", () => {
  describe("Fixture Delete", () => {
    it("should delete a fixture by ID", async () => {
      // Create a fixture
      const fixture: InsertFixture = {
        opponent: "Delete Test Team",
        venue: "Test Venue",
        date: new Date("2025-04-15T14:00:00"),
        format: "T20",
        status: "upcoming",
        ourScore: null,
        ourWickets: null,
        theirScore: null,
        theirWickets: null,
        result: null,
        notes: "Delete test",
      };

      const created = await createFixture(fixture);
      const createdId = (created as any).insertId || 1;

      // Verify it exists
      const fixturesBefore = await getFixtures();
      const existsBefore = fixturesBefore.some((f: any) => f.opponent === "Delete Test Team");
      expect(existsBefore).toBe(true);

      // Delete it
      await deleteFixture(createdId);

      // Verify it's deleted
      const fixturesAfter = await getFixtures();
      const existsAfter = fixturesAfter.some((f: any) => f.opponent === "Delete Test Team");
      expect(existsAfter).toBe(false);
    });

    it("should handle deletion of non-existent fixture gracefully", async () => {
      // Try to delete a fixture with a very high ID that doesn't exist
      const result = await deleteFixture(999999);
      expect(result).toBeDefined();
    });

    it("should delete multiple fixtures independently", async () => {
      // Create two fixtures
      const fixture1: InsertFixture = {
        opponent: "Team A Delete",
        venue: "Venue A",
        date: new Date("2025-04-15T14:00:00"),
        format: "T20",
        status: "upcoming",
        ourScore: null,
        ourWickets: null,
        theirScore: null,
        theirWickets: null,
        result: null,
        notes: "Test",
      };

      const fixture2: InsertFixture = {
        opponent: "Team B Delete",
        venue: "Venue B",
        date: new Date("2025-04-16T14:00:00"),
        format: "T20",
        status: "upcoming",
        ourScore: null,
        ourWickets: null,
        theirScore: null,
        theirWickets: null,
        result: null,
        notes: "Test",
      };

      const created1 = await createFixture(fixture1);
      const created2 = await createFixture(fixture2);
      const id1 = (created1 as any).insertId || 1;
      const id2 = (created2 as any).insertId || 2;

      // Delete first fixture
      await deleteFixture(id1);

      // Verify first is deleted but second exists
      const fixtures = await getFixtures();
      const team1Exists = fixtures.some((f: any) => f.opponent === "Team A Delete");
      const team2Exists = fixtures.some((f: any) => f.opponent === "Team B Delete");

      expect(team1Exists).toBe(false);
      expect(team2Exists).toBe(true);

      // Clean up
      await deleteFixture(id2);
    });
  });

  describe("Result Delete", () => {
    it("should delete a result by ID", async () => {
      // Create a result
      const result: InsertResult = {
        date: new Date("2025-03-01T14:00:00"),
        venue: "Delete Test Venue",
        league: "Test League",
        opponentName: "Delete Test Team",
        score: "145/6 vs 132/9",
        result: "win",
        scorecardUrl: null,
      };

      const created = await createResult(result);
      const createdId = (created as any).insertId || 1;

      // Verify it exists
      const resultsBefore = await getResults();
      const existsBefore = resultsBefore.some((r: any) => r.opponentName === "Delete Test Team");
      expect(existsBefore).toBe(true);

      // Delete it
      await deleteResult(createdId);

      // Verify it's deleted
      const resultsAfter = await getResults();
      const existsAfter = resultsAfter.some((r: any) => r.opponentName === "Delete Test Team");
      expect(existsAfter).toBe(false);
    });

    it("should handle deletion of non-existent result gracefully", async () => {
      // Try to delete a result with a very high ID that doesn't exist
      const result = await deleteResult(999999);
      expect(result).toBeDefined();
    });

    it("should delete multiple results independently", async () => {
      // Create two results
      const result1: InsertResult = {
        date: new Date("2025-03-01T14:00:00"),
        venue: "Venue 1",
        league: "League 1",
        opponentName: "Team A Delete Result",
        score: "145/6 vs 132/9",
        result: "win",
        scorecardUrl: null,
      };

      const result2: InsertResult = {
        date: new Date("2025-03-02T14:00:00"),
        venue: "Venue 2",
        league: "League 2",
        opponentName: "Team B Delete Result",
        score: "120 vs 121/5",
        result: "loss",
        scorecardUrl: null,
      };

      const created1 = await createResult(result1);
      const created2 = await createResult(result2);
      const id1 = (created1 as any).insertId || 1;
      const id2 = (created2 as any).insertId || 2;

      // Delete first result
      await deleteResult(id1);

      // Verify first is deleted but second exists
      const results = await getResults();
      const team1Exists = results.some((r: any) => r.opponentName === "Team A Delete Result");
      const team2Exists = results.some((r: any) => r.opponentName === "Team B Delete Result");

      expect(team1Exists).toBe(false);
      expect(team2Exists).toBe(true);

      // Clean up
      await deleteResult(id2);
    });

    it("should delete results with different result types", async () => {
      const resultTypes: Array<"win" | "loss" | "tie" | "no_result"> = ["win", "loss", "tie", "no_result"];

      for (const resultType of resultTypes) {
        const result: InsertResult = {
          date: new Date("2025-03-01T14:00:00"),
          venue: "Test Venue",
          league: "Test League",
          opponentName: `Team ${resultType} Delete`,
          score: "Test Score",
          result: resultType,
          scorecardUrl: null,
        };

        const created = await createResult(result);
        const id = (created as any).insertId || 1;

        // Delete it
        await deleteResult(id);

        // Verify it's deleted
        const results = await getResults();
        const exists = results.some((r: any) => r.opponentName === `Team ${resultType} Delete`);
        expect(exists).toBe(false);
      }
    });
  });

  describe("Delete Error Handling", () => {
    it("should not throw error when deleting with invalid ID", async () => {
      try {
        await deleteFixture(-1);
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });

    it("should not throw error when deleting result with invalid ID", async () => {
      try {
        await deleteResult(-1);
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });

  describe("Delete and Recreate", () => {
    it("should allow recreating a fixture after deletion", async () => {
      const fixture: InsertFixture = {
        opponent: "Recreate Test Team",
        venue: "Test Venue",
        date: new Date("2025-04-15T14:00:00"),
        format: "T20",
        status: "upcoming",
        ourScore: null,
        ourWickets: null,
        theirScore: null,
        theirWickets: null,
        result: null,
        notes: "Recreate test",
      };

      // Create, delete, and recreate
      const created1 = await createFixture(fixture);
      const id1 = (created1 as any).insertId || 1;
      await deleteFixture(id1);

      const created2 = await createFixture(fixture);
      const id2 = (created2 as any).insertId || 2;

      // Verify new fixture exists
      const fixtures = await getFixtures();
      const exists = fixtures.some((f: any) => f.opponent === "Recreate Test Team");
      expect(exists).toBe(true);

      // Clean up
      await deleteFixture(id2);
    });

    it("should allow recreating a result after deletion", async () => {
      const result: InsertResult = {
        date: new Date("2025-03-01T14:00:00"),
        venue: "Recreate Venue",
        league: "Recreate League",
        opponentName: "Recreate Test Team",
        score: "145/6 vs 132/9",
        result: "win",
        scorecardUrl: null,
      };

      // Create, delete, and recreate
      const created1 = await createResult(result);
      const id1 = (created1 as any).insertId || 1;
      await deleteResult(id1);

      const created2 = await createResult(result);
      const id2 = (created2 as any).insertId || 2;

      // Verify new result exists
      const results = await getResults();
      const exists = results.some((r: any) => r.opponentName === "Recreate Test Team");
      expect(exists).toBe(true);

      // Clean up
      await deleteResult(id2);
    });
  });
});
