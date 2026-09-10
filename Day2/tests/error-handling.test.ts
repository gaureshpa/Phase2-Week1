import { beforeEach, afterEach, describe, expect, it } from "vitest";
import {rm, writeFile} from "node:fs/promises";
import { loadTasks } from "../src/repository/task-repository";
import { completeTask, deleteTask } from "../src/services/task-service";

const FILE_PATH = "tasks.json";

describe("Error handling",  () => {
    beforeEach(async () => {
        await rm(FILE_PATH, { force: true });
    });

    afterEach(async () => {
        await rm(FILE_PATH, { force: true });
    });

    it("throws an error when the JSON data is malformed", async () => {
        await writeFile(FILE_PATH, "this is not valid JSON", "utf-8");
        await expect(loadTasks()).rejects.toThrow();
    });

    it("throws an error when completing a task with a missing ID", async () => {
        await expect(completeTask(939393)).rejects.toThrow("Task with ID 939393 not found")
    });

    it("throws an error when deleting a task with a missing ID", async () => {
        await expect(deleteTask(939393)).rejects.toThrow("Task with ID 939393 not found");
    });

    it("throws an error when the task data structure is invalid", async () => {
        const invalidTasks = [
            {
                id: "abc",
                title: 123,
                completed: "yes"
            }
        ];

        await writeFile(FILE_PATH, JSON.stringify(invalidTasks), "utf-8");
    });

    it("throws an error when completing a task with an invalid ID", async () => {
        await expect(completeTask(Number("abc"))).rejects.toThrow(
            "Task with ID NaN not found"
        );
    });
});

