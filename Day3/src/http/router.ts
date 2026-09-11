import type { IncomingMessage } from "node:http";
import type { Route } from "../types/route";

export function routeRequest(request: IncomingMessage): Route {
    const method = request.method;
    const url = request.url;

    if (!url) {
        return { type: "not-found" };
    }

    const parsedUrl = new URL(url, "http://localhost:3000");
    const pathname = parsedUrl.pathname;

    if (method === "GET" && pathname === "/tasks") {
        return { type: "list-tasks" };
    }

    if (method === "POST" && pathname === "/tasks") {
        return { type: "create-task"}
    }

    const taskMatch = pathname.match(/^\/tasks\/(\d+)$/);

    if(taskMatch) {
        const id = Number(taskMatch[1]);

        if ( method === "GET" ) {
            return { type: "get-task", id};
        }

        if ( method === "PATCH" ) {
            return { type: "update-task", id };
        }

        if (method === "DELETE" ) {
            return { type: "delete-task", id }; 
        }
    }

    return { type: "not-found" };

}
