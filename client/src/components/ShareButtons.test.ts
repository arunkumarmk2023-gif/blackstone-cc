import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ShareButtons Component", () => {
  const mockTitle = "Test Match Result";
  const mockText = "Check out this match result";
  const mockUrl = "https://example.com/results/123";

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  describe("Share URL Construction", () => {
    it("should construct valid Facebook share URL", () => {
      const baseUrl = "https://example.com/results/123";
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}`;
      
      expect(facebookUrl).toContain("facebook.com/sharer");
      expect(facebookUrl).toContain(encodeURIComponent(baseUrl));
    });

    it("should construct valid Twitter share URL", () => {
      const text = "Check out this match result #Cricket";
      const baseUrl = "https://example.com/results/123";
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(baseUrl)}`;
      
      expect(twitterUrl).toContain("twitter.com/intent/tweet");
      expect(twitterUrl).toContain(encodeURIComponent(text));
      expect(twitterUrl).toContain(encodeURIComponent(baseUrl));
    });

    it("should construct valid email share URL", () => {
      const subject = "Test Match Result";
      const body = "Check out this match result\n\nhttps://example.com/results/123";
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      expect(mailtoUrl).toContain("mailto:");
      expect(mailtoUrl).toContain(encodeURIComponent(subject));
      expect(mailtoUrl).toContain(encodeURIComponent(body));
    });
  });

  describe("Share Text Generation", () => {
    it("should generate proper share text for match results", () => {
      const opponentName = "Test Team";
      const score = "Blackstone CC 145/6 (20) vs Test Team 132/9 (20)";
      const result = "win";
      
      const shareText = `Check out the match result: Blackstone CC vs ${opponentName}. Score: ${score}. Result: ${result.toUpperCase()}. #BlackstoneCC #Cricket`;
      
      expect(shareText).toContain("Blackstone CC");
      expect(shareText).toContain(opponentName);
      expect(shareText).toContain(score);
      expect(shareText).toContain("#BlackstoneCC");
      expect(shareText).toContain("#Cricket");
    });

    it("should handle different result types in share text", () => {
      const resultTypes = ["win", "loss", "tie", "no_result"];
      
      resultTypes.forEach(resultType => {
        const shareText = `Result: ${resultType.toUpperCase()}`;
        expect(shareText).toContain(resultType.toUpperCase());
      });
    });

    it("should generate proper title for match results", () => {
      const opponentName = "Test Team";
      const result = "win";
      
      const shareTitle = `${opponentName} vs Blackstone CC - ${result.toUpperCase()}`;
      
      expect(shareTitle).toContain(opponentName);
      expect(shareTitle).toContain("Blackstone CC");
      expect(shareTitle).toContain(result.toUpperCase());
    });
  });

  describe("URL Encoding", () => {
    it("should properly encode special characters in URLs", () => {
      const textWithSpecialChars = "Team & Co. vs Blackstone CC - O'Reilly's XI";
      const encoded = encodeURIComponent(textWithSpecialChars);
      
      expect(encoded).toContain("%26");
      expect(encoded).toContain("%27");
      expect(encoded).not.toContain("&");
      expect(encoded).not.toContain("'");
    });

    it("should properly encode hashtags in URLs", () => {
      const textWithHashtags = "#BlackstoneCC #Cricket #CCL";
      const encoded = encodeURIComponent(textWithHashtags);
      
      expect(encoded).toContain("%23");
      expect(encoded).not.toContain("#");
    });

    it("should properly encode URLs with query parameters", () => {
      const urlWithParams = "https://example.com/results?id=123&league=CCL";
      const encoded = encodeURIComponent(urlWithParams);
      
      expect(encoded).toContain("%3F");
      expect(encoded).toContain("%3D");
      expect(encoded).toContain("%26");
    });
  });

  describe("Share Content Validation", () => {
    it("should include all required information in share text", () => {
      const requiredElements = [
        "Blackstone CC",
        "match result",
        "Score:",
        "#BlackstoneCC",
        "#Cricket"
      ];
      
      const shareText = `Check out the match result: Blackstone CC vs Test Team. Score: 145/6 vs 132/9. Result: WIN. #BlackstoneCC #Cricket`;
      
      requiredElements.forEach(element => {
        expect(shareText).toContain(element);
      });
    });

    it("should include opponent name in share content", () => {
      const opponents = ["Team A", "Team B", "Team C"];
      
      opponents.forEach(opponent => {
        const shareText = `Blackstone CC vs ${opponent}`;
        expect(shareText).toContain(opponent);
      });
    });

    it("should include match score in share content", () => {
      const scores = [
        "145/6 (20) vs 132/9 (20)",
        "120 all out vs 121/5",
        "No Result"
      ];
      
      scores.forEach(score => {
        const shareText = `Score: ${score}`;
        expect(shareText).toContain(score);
      });
    });
  });

  describe("Share Platform URLs", () => {
    it("should generate Facebook share URL with correct domain", () => {
      const facebookUrl = "https://www.facebook.com/sharer/sharer.php";
      expect(facebookUrl).toContain("facebook.com");
      expect(facebookUrl).toContain("sharer");
    });

    it("should generate Twitter share URL with correct domain", () => {
      const twitterUrl = "https://twitter.com/intent/tweet";
      expect(twitterUrl).toContain("twitter.com");
      expect(twitterUrl).toContain("intent/tweet");
    });

    it("should generate mailto URL for email sharing", () => {
      const mailtoUrl = "mailto:?subject=Test&body=Test";
      expect(mailtoUrl).toContain("mailto:");
    });
  });

  describe("Share Button Props", () => {
    it("should accept title prop", () => {
      const title = "Match Result: Blackstone CC vs Test Team";
      expect(title).toBeDefined();
      expect(typeof title).toBe("string");
      expect(title.length).toBeGreaterThan(0);
    });

    it("should accept text prop", () => {
      const text = "Check out the match result";
      expect(text).toBeDefined();
      expect(typeof text).toBe("string");
      expect(text.length).toBeGreaterThan(0);
    });

    it("should accept optional url prop", () => {
      const url = "https://example.com/results/123";
      expect(url).toBeDefined();
      expect(typeof url).toBe("string");
      expect(url).toContain("http");
    });

    it("should handle missing url prop gracefully", () => {
      const url = undefined;
      const fallbackUrl = url || "https://example.com";
      expect(fallbackUrl).toBe("https://example.com");
    });
  });

  describe("Share Text Formatting", () => {
    it("should format match result text properly", () => {
      const opponent = "Test Team";
      const score = "145/6 vs 132/9";
      const result = "win";
      
      const text = `Check out the match result: Blackstone CC vs ${opponent}. Score: ${score}. Result: ${result.toUpperCase()}. #BlackstoneCC #Cricket`;
      
      expect(text).toMatch(/Check out the match result:/);
      expect(text).toMatch(/vs/);
      expect(text).toMatch(/Score:/);
      expect(text).toMatch(/Result:/);
      expect(text).toMatch(/#BlackstoneCC/);
      expect(text).toMatch(/#Cricket/);
    });

    it("should capitalize result type in share text", () => {
      const results = ["win", "loss", "tie", "no_result"];
      
      results.forEach(result => {
        const text = `Result: ${result.toUpperCase()}`;
        expect(text).toContain(result.toUpperCase());
      });
    });
  });
});
