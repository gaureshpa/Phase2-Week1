import { describe, it, expect } from "vitest";
import { isValidPriority, isValidStatus, isValidAssignee, isValidId, validateCreateTicket } from "../src/validation";

describe("Ticket validation", () => {

    it("should accept a valid priority", () => {
        expect(isValidPriority("high")).toBe(true);
    });

    it("should reject an invalid priority", () => {
        expect(isValidPriority("urgent")).toBe(false);
    });

    it("should accept a valid status", () => {
        expect(isValidStatus("in-progress")).toBe(true);
    });

    it("should reject an invalid status", () => {
        expect(isValidStatus("not-done")).toBe(false);
    });

    it("should accept a valid assignee", () => {
        expect(isValidAssignee("Mahesh")).toBe(true);
    });

    it("should reject an invaldi asignee", () => {
        expect(isValidAssignee("")).toBe(false);
    });

    it("should accept a valid ID", () => {
        expect(isValidId("32")).toBe(true);
    });

    it("should reject an invalid ID", () => {
        expect(isValidId("hello")).toBe(false);
    });

    it("should accept a valid ticket", () => {
        expect(
            validateCreateTicket({
                title: "Screen Flickering",
                description: "Screen flickers on boot",
                priority: "medium"
            })
        ).toBe(null)
    });

    it("should reject a ticket with invalid field", () => {
        expect(validateCreateTicket({
            title: "",
            description: "Dashboard is not mobile friendly",
            priority: "high"
        })).not.toBe(null);
    })
});

