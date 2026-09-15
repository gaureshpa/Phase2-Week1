import type { NextFunction, Request, Response } from "express";

export function logger(
    request: Request,
    _response: Response,
    next: NextFunction
): void {
    console.log(`${request.method} ${request.url}`);
    next();
}
