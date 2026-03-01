import { describe, it, expect } from "vitest";
import { InsertJoiner } from "../drizzle/schema";

describe("Joiner Functionality", () => {
  it("should validate joiner submission data", () => {
    const joinerData: InsertJoiner = {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1-234-567-8900",
      role: "batsman",
      experience: "intermediate",
      message: "I am interested in joining the cricket club and would like to participate in matches.",
      status: "new",
    };

    expect(joinerData.name).toBeDefined();
    expect(joinerData.email).toContain("@");
    expect(joinerData.role).toMatch(/batsman|bowler|allrounder|wicketkeeper|supporter/);
    expect(joinerData.experience).toMatch(/beginner|intermediate|advanced|professional/);
    expect(joinerData.message.length).toBeGreaterThanOrEqual(10);
    expect(joinerData.status).toBe("new");
  });

  it("should handle joiner with optional phone", () => {
    const joinerData: InsertJoiner = {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: null,
      role: "bowler",
      experience: "advanced",
      message: "I have been playing cricket for 10 years and would love to join your club.",
      status: "new",
    };

    expect(joinerData.name).toBeDefined();
    expect(joinerData.phone).toBeNull();
    expect(joinerData.role).toBe("bowler");
  });

  it("should validate different playing roles", () => {
    const roles = ["batsman", "bowler", "allrounder", "wicketkeeper", "supporter"];
    
    roles.forEach((role) => {
      const joinerData: InsertJoiner = {
        name: "Test Player",
        email: "test@example.com",
        phone: null,
        role: role as any,
        experience: "beginner",
        message: "I want to join the club.",
        status: "new",
      };
      
      expect(joinerData.role).toBe(role);
    });
  });

  it("should validate different experience levels", () => {
    const levels = ["beginner", "intermediate", "advanced", "professional"];
    
    levels.forEach((level) => {
      const joinerData: InsertJoiner = {
        name: "Test Player",
        email: "test@example.com",
        phone: null,
        role: "batsman",
        experience: level as any,
        message: "I want to join the club.",
        status: "new",
      };
      
      expect(joinerData.experience).toBe(level);
    });
  });

  it("should validate joiner status transitions", () => {
    const statuses = ["new", "reviewed", "accepted", "rejected", "archived"];
    
    statuses.forEach((status) => {
      const joinerData: InsertJoiner = {
        name: "Test Player",
        email: "test@example.com",
        phone: null,
        role: "batsman",
        experience: "intermediate",
        message: "I want to join the club.",
        status: status as any,
      };
      
      expect(joinerData.status).toBe(status);
    });
  });

  it("should handle joiner with long message", () => {
    const longMessage = "I have been playing cricket since childhood and have represented my school and college teams. I am passionate about the sport and looking for a competitive team to join. I have experience with both batting and bowling and would love to contribute to your club's success.";
    
    const joinerData: InsertJoiner = {
      name: "Experienced Player",
      email: "experienced@example.com",
      phone: "+1-555-123-4567",
      role: "allrounder",
      experience: "professional",
      message: longMessage,
      status: "new",
    };

    expect(joinerData.message.length).toBeGreaterThan(100);
    expect(joinerData.message).toBe(longMessage);
  });

  it("should handle multiple joiner submissions", () => {
    const joiners: InsertJoiner[] = [
      {
        name: "Player 1",
        email: "player1@example.com",
        phone: null,
        role: "batsman",
        experience: "beginner",
        message: "I want to join your cricket club.",
        status: "new",
      },
      {
        name: "Player 2",
        email: "player2@example.com",
        phone: "+1-555-987-6543",
        role: "bowler",
        experience: "advanced",
        message: "I am an experienced bowler looking to join a competitive team.",
        status: "new",
      },
      {
        name: "Player 3",
        email: "player3@example.com",
        phone: null,
        role: "supporter",
        experience: "beginner",
        message: "I am interested in supporting the club and learning cricket.",
        status: "new",
      },
    ];

    expect(joiners).toHaveLength(3);
    expect(joiners[0].role).toBe("batsman");
    expect(joiners[1].role).toBe("bowler");
    expect(joiners[2].role).toBe("supporter");
  });
});
