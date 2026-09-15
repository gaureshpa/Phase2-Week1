import { describe, expect, it } from "vitest";
import { beforeEach } from "vitest";

describe("Task API", () => {
    it("GET /tasks returns 200", async () => {
        const response = await fetch("http://localhost:3000/tasks");
        expect(response.status).toBe(200);
    });

    it("GET /tasks/:id returns 200 for existing task", async () => {
        const response = await fetch("http://localhost:3000/tasks/1");
        expect(response.status).toBe(200);

        const task = await response.json();
        expect(task.id).toBe(1);
    });

    it("GET /tasks/:id returns 404 for missing task", async () => {
        const response = await fetch("http://localhost:3000/tasks/999");
        expect(response.status).toBe(404);
    });

    it("POST /tasks creates a task", async () => {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Learn HTTP",
            }),
        });

        expect(response.status).toBe(201);

        const task = await response.json();

        expect(task.title).toBe("Learn HTTP");
        expect(task.completed).toBe(false);
    });

    it("POST /tasks rejects invalid input", async () => {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: 123,
            }),
        });

        expect(response.status).toBe(400);
    });

    it("PATCH /tasks/:id updates a task", async () => {
        const response = await fetch("http://localhost:3000/tasks/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Updated Task",
            }),
        });

        expect(response.status).toBe(200);
        const task = await response.json();

        expect(task.title).toBe("Updated Task");
    });

    it("DELETE /tasks/:id deletes a task", async () => {
        const response = await fetch("http://localhost:3000/tasks/2", {
            method: "DELETE",
        });

        expect(response.status).toBe(204);
    });

    it("unknown route returns 404", async () => {
        const response = await fetch("http://localhost:3000/hello");
        expect(response.status).toBe(404);
    });
});
