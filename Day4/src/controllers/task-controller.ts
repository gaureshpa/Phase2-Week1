import type { Request, Response } from "express";
import { 
    listTasks as listTasksService,
    addTask as addTaskService,
    getTask as getTaskService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService,
} from "../services/task-service";
import { validateCreateTaskBody, validateUpdateTaskBody } from "../validation";

export async function listTasks(
    _request: Request,
    response: Response
): Promise<void> {

    const tasks = await listTasksService();
    response.status(200).json(tasks);
}

export async function getTask(
    request: Request,
    response: Response
): Promise<void> {
    const id = Number(request.params.id);
    const task = await getTaskService(id);

    response.status(200).json(task);
}

export async function createTask(
    request: Request,
    response: Response
): Promise<void> {
    const { title } = validateCreateTaskBody(request.body);
    const task = await addTaskService(title);

    response.status(201).json(task);
}

export async function updateTask(
    request: Request,
    response: Response
): Promise<void> {
    const id = Number(request.params.id);
    const updates = validateUpdateTaskBody(request.body);
    const task = await updateTaskService(id, updates);
    
    response.status(200).json(task);
}

export async function deleteTask (
    request: Request,
    response: Response
): Promise<void> {
    const id = Number(request.params.id);
    await deleteTaskService(id);

    response.status(204).send();
}
