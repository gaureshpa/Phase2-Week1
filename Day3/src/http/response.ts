import type { ServerResponse } from "node:http";

export function sendJson(
    response: ServerResponse,
    statusCode: number,
    data: unknown
): void {
    response.statusCode = statusCode;

    if (statusCode === 204) {
        response.end();
        return;
    }

    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(data));
}

export function sendError(
    response: ServerResponse,
    statusCode: number,
    message: string
): void {
    sendJson(response, statusCode, {
        error: message,
    });
}
