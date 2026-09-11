import { createServer } from "node:http";
import { routeRequest } from "./router";
import { sendJson, sendError } from "./response";
import { listTasks, getTask, addTask, updateTask, deleteTask } from "../services/task-service";
import { parseJsonBody } from "./body";
import { validateCreateTaskBody, validateUpdateTaskBody } from "./validation";

const server = createServer(async (request, response) => {
    const route = routeRequest(request);

    try {
        if (route.type === "list-tasks") {
            const tasks = await listTasks();
            sendJson(response, 200, tasks);
            return;
        }

        if (route.type === "get-task") {
            const task = await getTask(route.id);
            sendJson(response, 200, task);
            return;
        }

        if (route.type === "create-task") {
            try {
                const body = await parseJsonBody(request);
                const { title } = validateCreateTaskBody(body);
                const task = await addTask(title);

                sendJson(response, 201, task);
                return;
            }
            catch (error: unknown) {
                if(error instanceof SyntaxError) {
                    sendError(response, 400, "Invalid JSON");
                    return;
                }

                if (error instanceof Error) {
                    sendError(response, 400, error.message);
                    return;
                }

                sendError(response, 500, "Internal server error");
            }
        }

        if (route.type === "update-task") {
            try {
                const body = await parseJsonBody(request);
                const updates = validateUpdateTaskBody(body);

                const task = await updateTask(route.id, updates);

                sendJson(response, 200, task);
                return;
            }
            catch (error: unknown) {
                if (error instanceof SyntaxError) {
                    sendError(response, 400, "Invalid JSON");
                    return;
                }

                if (error instanceof Error) {
                    if (error.message.includes("not found")) {
                        sendError(response, 404, error.message);
                        return;
                    }

                    sendError(response, 400, error.message);
                    return;
                }

                sendError(response, 500, "Internal server error");
            }
        }

        if (route.type === "delete-task") {
            try {
                await deleteTask(route.id);
                sendJson(response, 204, null);
                return;

            } catch (error: unknown) {
                if(error instanceof Error) {
                    if (error.message.includes("not found")) {
                        sendError(response, 404, error.message);
                        return;
                    }

                    sendError(response, 500, error.message);
                    return;
                }

                sendError(response, 500, "Internal server error");
            }
        }


        if (route.type === "not-found") {
            sendError(response, 404, "Route not found");
            return;
        }

        sendError(response, 501, "Route not implemented");
    }
    catch(error: unknown) {
        if(error instanceof Error) {
            sendError(response, 404, error.message);
            return;
        }

        sendError(response, 500, "Internal server error");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
