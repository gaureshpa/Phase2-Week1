import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
    error, _request, response, _next
) => {
    console.error(error);

    if (error instanceof Error) {
        if(error.message.includes("not found")) {
            response.status(404).json({
                error: error.message,
            });
            return;
        }

        response.status(400).json({
            error: error.message,
        });
        return;
    }

    response.status(500).json({
        error: "Internal server error",
    });
}
