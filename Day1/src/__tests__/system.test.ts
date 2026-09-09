import { describe, expect, it } from "vitest";
import { getNodeVersion } from "../system/node";
import { getOperatingSystem } from "../system/os";
import { getMemoryInformation } from "../system/memory";
import { getEnvironment } from "../system/environment";
import { getCurrentDirectory } from "../system/directory";
import os from "node:os";

describe("getNodeVersion", () => {
    it("returns the current Node.js version", () => {
        expect(getNodeVersion()).toBe(process.version);
    });
});

describe("getOperatingSystem", () => {
    it("returns valid Operating System specs", () => {
        const OperatingSystem = getOperatingSystem();

        expect(OperatingSystem.platform).toBe(os.platform());
        expect(OperatingSystem.architecture).toBe(os.arch());
        expect(OperatingSystem.release).toBe(os.release());
    });
});

describe("getMemoryInformation", () => {
    it("returns valid memory informations", () => {
        const MemoryInfo = getMemoryInformation();

        expect(MemoryInfo.total).toBe(os.totalmem());
        expect(MemoryInfo.free).toBe(os.freemem());

        expect(MemoryInfo.total).toBeGreaterThan(0);
        expect(MemoryInfo.free).toBeGreaterThanOrEqual(0);
    });
});

describe("getEnvironment", () => {
    it("returns valid environment data", () => {
        const EnvironmentData = getEnvironment();

        expect(EnvironmentData).toBe(process.env);
    });
});

describe("getCurrentDirectory", () => {
    it("returns the correct directory", () => {
        expect(getCurrentDirectory()).toBe(process.cwd());
    });
});
