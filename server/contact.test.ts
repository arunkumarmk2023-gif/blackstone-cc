import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateContactConfirmationEmail, generateContactConfirmationEmailText } from "./email";

describe("Contact Form Email Templates", () => {
  const mockContactData = {
    name: "John Doe",
    email: "john@example.com",
    subject: "Membership Inquiry",
    message: "I am interested in joining the club.",
  };

  describe("generateContactConfirmationEmail", () => {
    it("should generate HTML email with all contact details", () => {
      const html = generateContactConfirmationEmail(mockContactData);

      expect(html).toContain("Blackstone Cricket Club");
      expect(html).toContain("Message Received");
      expect(html).toContain("Hello <strong>John Doe</strong>");
      expect(html).toContain("john@example.com");
      expect(html).toContain("Membership Inquiry");
      expect(html).toContain("I am interested in joining the club.");
    });

    it("should include proper HTML structure", () => {
      const html = generateContactConfirmationEmail(mockContactData);

      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("<html>");
      expect(html).toContain("</html>");
      expect(html).toContain("<style>");
      expect(html).toContain("</style>");
    });

    it("should include social media links", () => {
      const html = generateContactConfirmationEmail(mockContactData);

      expect(html).toContain("facebook.com");
      expect(html).toContain("instagram.com");
      expect(html).toContain("threads.com");
    });

    it("should handle multiline messages with line breaks", () => {
      const dataWithNewlines = {
        ...mockContactData,
        message: "Line 1\nLine 2\nLine 3",
      };

      const html = generateContactConfirmationEmail(dataWithNewlines);
      expect(html).toContain("Line 1<br>Line 2<br>Line 3");
    });

    it("should handle special characters in user input", () => {
      const dataWithSpecialChars = {
        ...mockContactData,
        name: "John & Jane",
        subject: "Test Subject",
      };

      const html = generateContactConfirmationEmail(dataWithSpecialChars);
      expect(html).toContain("John & Jane");
      expect(html).toContain("Test Subject");
    });
  });

  describe("generateContactConfirmationEmailText", () => {
    it("should generate plain text email with all contact details", () => {
      const text = generateContactConfirmationEmailText(mockContactData);

      expect(text).toContain("Hello John Doe");
      expect(text).toContain("john@example.com");
      expect(text).toContain("Membership Inquiry");
      expect(text).toContain("I am interested in joining the club.");
    });

    it("should include proper plain text formatting", () => {
      const text = generateContactConfirmationEmailText(mockContactData);

      expect(text).toContain("--- YOUR MESSAGE SUMMARY ---");
      expect(text).toContain("Subject:");
      expect(text).toContain("Email:");
      expect(text).toContain("Message:");
    });

    it("should include footer information", () => {
      const text = generateContactConfirmationEmailText(mockContactData);

      expect(text).toContain("Blackstone Cricket Club");
      expect(text).toContain("Connecticut Cricket League");
      expect(text).toContain("Hard Tennis Ball Division");
    });

    it("should preserve multiline messages", () => {
      const dataWithNewlines = {
        ...mockContactData,
        message: "Line 1\nLine 2\nLine 3",
      };

      const text = generateContactConfirmationEmailText(dataWithNewlines);
      expect(text).toContain("Line 1\nLine 2\nLine 3");
    });
  });

  describe("Email content consistency", () => {
    it("should have matching information in HTML and text versions", () => {
      const html = generateContactConfirmationEmail(mockContactData);
      const text = generateContactConfirmationEmailText(mockContactData);

      // Both should contain the user's email
      expect(html).toContain(mockContactData.email);
      expect(text).toContain(mockContactData.email);

      // Both should contain the subject
      expect(html).toContain(mockContactData.subject);
      expect(text).toContain(mockContactData.subject);

      // Both should contain the message
      expect(html).toContain(mockContactData.message);
      expect(text).toContain(mockContactData.message);
    });
  });
});
