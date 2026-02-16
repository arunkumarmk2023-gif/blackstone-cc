import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createContactSubmission, getContactSubmissions, getContactSubmissionById, updateContactSubmissionStatus, deleteContactSubmission } from "./db";
import { InsertContactSubmission } from "../drizzle/schema";

describe("Contact Submission Storage", () => {
  let createdSubmissionId: number;

  const testSubmission: InsertContactSubmission = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Membership Inquiry",
    message: "I'm interested in joining the cricket club.",
    status: "new",
  };

  it("should create a new contact submission", async () => {
    const result = await createContactSubmission(testSubmission);
    expect(result).toBeDefined();
    // Extract ID from the result
    const submissions = await getContactSubmissions();
    const created = submissions.find((s) => s.email === testSubmission.email);
    expect(created).toBeDefined();
    expect(created?.name).toBe(testSubmission.name);
    expect(created?.email).toBe(testSubmission.email);
    expect(created?.subject).toBe(testSubmission.subject);
    expect(created?.status).toBe("new");
    if (created) {
      createdSubmissionId = created.id;
    }
  });

  it("should retrieve all contact submissions", async () => {
    const submissions = await getContactSubmissions();
    expect(Array.isArray(submissions)).toBe(true);
    expect(submissions.length).toBeGreaterThan(0);
  });

  it("should retrieve a contact submission by ID", async () => {
    if (!createdSubmissionId) {
      throw new Error("No submission ID available for testing");
    }
    const submission = await getContactSubmissionById(createdSubmissionId);
    expect(submission).toBeDefined();
    expect(submission?.id).toBe(createdSubmissionId);
    expect(submission?.name).toBe(testSubmission.name);
    expect(submission?.email).toBe(testSubmission.email);
  });

  it("should update contact submission status", async () => {
    if (!createdSubmissionId) {
      throw new Error("No submission ID available for testing");
    }
    const result = await updateContactSubmissionStatus(
      createdSubmissionId,
      "read",
      "Reviewed the inquiry",
      1
    );
    expect(result).toBeDefined();

    const updated = await getContactSubmissionById(createdSubmissionId);
    expect(updated?.status).toBe("read");
    expect(updated?.notes).toBe("Reviewed the inquiry");
  });

  it("should handle optional phone number", async () => {
    const submissionWithoutPhone: InsertContactSubmission = {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: null,
      subject: "Event Question",
      message: "When is the next match?",
      status: "new",
    };
    await createContactSubmission(submissionWithoutPhone);
    const submissions = await getContactSubmissions();
    const created = submissions.find((s) => s.email === submissionWithoutPhone.email);
    expect(created).toBeDefined();
    expect(created?.phone).toBeNull();
  });

  it("should delete a contact submission", async () => {
    if (!createdSubmissionId) {
      throw new Error("No submission ID available for testing");
    }
    const result = await deleteContactSubmission(createdSubmissionId);
    expect(result).toBeDefined();

    const deleted = await getContactSubmissionById(createdSubmissionId);
    expect(deleted).toBeUndefined();
  });

  it("should preserve submission data integrity", async () => {
    const submission: InsertContactSubmission = {
      name: "Test User",
      email: "test@example.com",
      phone: "+1 (555) 999-8888",
      subject: "Test Subject with Special Characters: @#$%",
      message: "This is a test message with\nmultiple lines\nand special chars: !@#$%^&*()",
      status: "new",
    };
    await createContactSubmission(submission);
    const submissions = await getContactSubmissions();
    const created = submissions.find((s) => s.email === submission.email);
    expect(created?.subject).toBe(submission.subject);
    expect(created?.message).toBe(submission.message);
  });

  it("should handle status transitions correctly", async () => {
    const submission: InsertContactSubmission = {
      name: "Status Test",
      email: "status@example.com",
      phone: null,
      subject: "Status Test",
      message: "Testing status transitions",
      status: "new",
    };
    await createContactSubmission(submission);
    const submissions = await getContactSubmissions();
    const created = submissions.find((s) => s.email === submission.email);
    
    if (created) {
      // Transition from new -> read
      await updateContactSubmissionStatus(created.id, "read");
      let updated = await getContactSubmissionById(created.id);
      expect(updated?.status).toBe("read");

      // Transition from read -> responded
      await updateContactSubmissionStatus(created.id, "responded");
      updated = await getContactSubmissionById(created.id);
      expect(updated?.status).toBe("responded");

      // Transition from responded -> archived
      await updateContactSubmissionStatus(created.id, "archived");
      updated = await getContactSubmissionById(created.id);
      expect(updated?.status).toBe("archived");
    }
  });
});
