export function validateCreateTaskBody(
    body: unknown
): { title: string } {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        throw new Error("Request body must be a JSON object");
    }

    const data = body as Record<string, unknown>;

    if (typeof data.title !== "string") {
        throw new Error("Title must be a string");
    }

    if (!data.title.trim()) {
        throw new Error("Title is required");
    }

    const keys = Object.keys(data);

    if (keys.some((key) => key !== "title")) {
        throw new Error("Only title is allowed");
    }

    return {
        title: data.title.trim(),
    };
}

export function validateUpdateTaskBody(
    body: unknown
): { title?: string; completed?: boolean } {
    
    if( typeof body!== "object" || body === null ||Array.isArray(body)) {
        throw new Error("Request body must be a JSON object");
    }

    const data = body as Record<string, unknown>;
    const keys = Object.keys(data);

    if (keys.length === 0) {
        throw new Error("At least one field is required");
    }

    if (keys.some((key) => key !== "title" && key !== "completed")) {
        throw new Error("Only title and completed are allowed");
    }

    if ("title" in data) {
        if(typeof data.title !== "string") {
            throw new Error("Title must be a string");
        }

        if (!data.title.trim()) {
            if (typeof data.title !== "string") {
                throw new Error("Title must be a string");
            }

            if(!data.title.trim()) {
                throw new Error("Title cannot be empty");
            }
        }
    }

    if ("completed" in data) {
        if (typeof data.completed !== "boolean") {
            throw new Error("Completed must be a boolean");
        }
    }

    const updates: {
        title?: string,
        completed?: boolean
    } = {};

    if ("title" in data) {
        updates.title = data.title as string;
    }

    if ("completed" in data) {
        updates.completed = data.completed as boolean;
    }

    return updates;

}