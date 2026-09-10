import { readFile, writeFile } from "node:fs/promises";
import type { Task } from "../types/task";
import { FILE } from "node:dns";

const FILE_PATH = "tasks.json";

export async function loadTasks(): Promise<Task[]> {
    try{
        const data = await readFile(FILE_PATH, "utf-8");
        return JSON.parse(data) as Task[];
    }
    catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
            return [];
        }

        throw error;
    }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
    const data = JSON.stringify(tasks, null, 2);
    await writeFile(FILE_PATH, data, "utf-8");
}
