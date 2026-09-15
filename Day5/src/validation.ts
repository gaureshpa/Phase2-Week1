export function isValidPriority(priority: unknown): boolean {
    return (
        priority === "low" ||
        priority === "medium" ||
        priority === "high"
    );
}

export function isValidStatus(status: unknown): boolean {
    return (
        status === "open" ||
        status === "in-progress" ||
        status === "resolved"
    );
}

export function validateCreateTicket(body: unknown): string | null {
    if (typeof body !== "object" || body === null) {
        return "Request body must be an object";
    }

    const input = body as {
        title?: unknown;
        description?: unknown;
        priority?: unknown;
    }

    if (typeof input.title !== "string" || input.title.trim() === "") {
        return "Title is required";
    }

    if (
        typeof input.description !== "string" ||
        input.description.trim() === ""
    ) {
        return "Description is required";
    }

    if (!isValidPriority(input.priority)) {
        return "Priority must be low, medium or high";
    }

    return null;
}


export function isValidAssignee(assignee:unknown): boolean {
    return assignee === null ||
        (typeof assignee ==="string" && assignee.trim() !== "");
}

export function isValidId(id: string): boolean {
    const numberId = Number(id);
    return Number.isInteger(numberId) && numberId > 0;
}
