import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function requestId (
    _request: Request,
    response: Response,
    next: NextFunction
): void {
    const id = randomUUID();
    
    response.setHeader("X-Request-ID", id);
    next();
}