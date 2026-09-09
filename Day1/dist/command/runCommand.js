"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = runCommand;
const node_1 = require("../system/node");
const os_1 = require("../system/os");
const memory_1 = require("../system/memory");
const directory_1 = require("../system/directory");
const environment_1 = require("../system/environment");
function runCommand(command) {
    switch (command) {
        case "version":
            console.log("Node version:", (0, node_1.getNodeVersion)());
            break;
        case "os":
            const operatingSystem = (0, os_1.getOperatingSystem)();
            console.log("Platform:", operatingSystem.platform);
            console.log("Architecture:", operatingSystem.architecture);
            console.log("Release:", operatingSystem.release);
            break;
        case "memory":
            const memoryInformatin = (0, memory_1.getMemoryInformation)();
            const totalGB = memoryInformatin.total / (1024 ** 3);
            const freeGB = memoryInformatin.free / (1024 ** 3);
            console.log("Total Memory:", totalGB.toFixed(2), "GB");
            console.log("Free Memory:", freeGB.toFixed(2), "GB");
            break;
        case "cwd":
            console.log("Current Directory:", (0, directory_1.getCurrentDirectory)());
            break;
        case "environment":
            const environment = (0, environment_1.getEnvironment)();
            console.log(environment);
            break;
        case undefined:
            console.log("No command provided");
            break;
        default:
            console.log("Unknown command:", command);
            break;
    }
}
//# sourceMappingURL=runCommand.js.map