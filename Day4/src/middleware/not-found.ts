import type { NextFunction, Request, Response } from "express";

export function notFound(
    _request: Request,
    response: Response
): void {
    response.status(404).json({
        error: "Route not found",
    });
}
