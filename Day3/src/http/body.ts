import type { IncomingMessage } from "node:http";

export async function parseJsonBody(
    request: IncomingMessage
): Promise<unknown> {
    const chunks: Buffer[] = [];

    for await (const chunk of request) {
        chunks.push(Buffer.from(chunk));
    }

    const body = Buffer.concat(chunks).toString("utf-8");

    if(!body.trim()) {
        return {};
    }

    return JSON.parse(body);
}
