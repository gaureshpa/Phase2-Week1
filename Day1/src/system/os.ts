import os from "node:os";

export interface OperatingSystemInfo {
    platform: string;
    architecture: string;
    release: string;
}

export function getOperatingSystem(): OperatingSystemInfo {
    const platform = os.platform();
    const architecture = os.arch();
    const release = os.release();

    return {
        platform, architecture, release
    };
}