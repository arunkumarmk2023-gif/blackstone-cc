import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
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

describe("newsletter", () => {
  it("allows public users to subscribe to newsletter", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    const result = await caller.newsletter.subscribe({
      email: "subscriber@example.com",
      name: "Test Subscriber",
    });

    expect(result).toBeDefined();
  });

  it("prevents duplicate email subscriptions", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    // First subscription should succeed
    await caller.newsletter.subscribe({
      email: "duplicate@example.com",
      name: "First",
    });

    // Second subscription with same email should fail
    try {
      await caller.newsletter.subscribe({
        email: "duplicate@example.com",
        name: "Second",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("already subscribed");
    }
  });

  it("allows admins to view newsletter subscribers", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.list();

    expect(Array.isArray(result)).toBe(true);
  });

  it("prevents non-admins from viewing subscribers", async () => {
    const user: AuthenticatedUser = {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };

    const caller = appRouter.createCaller({
      user,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    try {
      await caller.newsletter.list();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Only admins");
    }
  });

  it("allows users to unsubscribe from newsletter", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    // Subscribe first
    await caller.newsletter.subscribe({
      email: "unsubscribe@example.com",
      name: "Test",
    });

    // Then unsubscribe
    const result = await caller.newsletter.unsubscribe({
      email: "unsubscribe@example.com",
    });

    expect(result).toBeDefined();
  });
});
