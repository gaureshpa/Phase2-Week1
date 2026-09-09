import os from "node:os"

export interface MemoryInfo {
    total: number;
    free: number; 
}

export function getMemoryInformation(): MemoryInfo {
    const total = os.totalmem();
    const free = os.freemem();

    return {
        total, free
    };
}