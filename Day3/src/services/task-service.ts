import { loadTasks, saveTasks } from "../repository/task-repository";
import type { Task } from "../types/task";

export async function addTask(title: string): Promise<Task> {
    const tasks = await loadTasks();

    const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map((task) => task.id)) + 1;

    const task: Task = {
        id: nextId, 
        title,
        completed: false,
    };

    tasks.push(task);

    await saveTasks(tasks);

    return task;
}

export async function listTasks(): Promise<Task[]> {
    return loadTasks();
}

export async function completeTask(id: number): Promise<Task> {
    const tasks = await loadTasks();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        throw new Error(`Task with ID ${id} not found`);
    }

    task.completed = true;
    await saveTasks(tasks);

    return task;
}

export async function deleteTask(id: number): Promise<void> {
    const tasks = await loadTasks();
    const taskExists = tasks.some((task) => task.id === id);

    if (!taskExists) {
        throw new Error(`Task with ID ${id} not found`);
    }

    const remainingTasks = tasks.filter((task) => task.id !== id);
    await saveTasks(remainingTasks);

}


export async function filterTasks(filter: "all" | "completed" | "pending"): Promise<Task[]> {
    const tasks = await loadTasks();
    
    if(filter === "all") {
        return tasks;
    }

    if (filter === "completed"){
        return tasks.filter((task) => task.completed);
    }

    return tasks.filter((task) => !task.completed);
}


export async function getTask(id: number): Promise<Task> {
    const tasks = await loadTasks();

    const task = tasks.find((task) => task.id === id);

    if(!task) {
        throw new Error(`Task with ID ${id} not found`);
    }

    return task;
}

export async function updateTask(
    id: number,
    updates: {
        title?: string;
        completed?: boolean;
    }
): Promise<Task> {
    const tasks = await loadTasks();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        throw new Error(`Task with ID ${id} not found`);
    }

    if (updates.title !== undefined) {
        task.title = updates.title;
    }

    if (updates.completed !== undefined) {
        task.completed = updates.completed;
    }

    await saveTasks(tasks);
    return task;
}
