import { getNodeVersion } from "../system/node";
import { getOperatingSystem } from "../system/os";
import { getMemoryInformation } from "../system/memory";
import { getCurrentDirectory } from "../system/directory";
import { getEnvironment } from "../system/environment";

export function runCommand(command: string | undefined): void {
    switch (command) {
        case "version":
            console.log("Node version:", getNodeVersion());
            break;

        case "os": 
            const operatingSystem = getOperatingSystem();
            console.log("Platform:", operatingSystem.platform);
            console.log("Architecture:", operatingSystem.architecture);
            console.log("Release:", operatingSystem.release);
            break;
    
        case "memory": 
            const memoryInformatin = getMemoryInformation();
            
            const totalGB = memoryInformatin.total / (1024 ** 3);
            const freeGB = memoryInformatin.free / (1024 ** 3);

            console.log("Total Memory:", totalGB.toFixed(2), "GB");
            console.log("Free Memory:", freeGB.toFixed(2), "GB");
            break;

        case "cwd":
            console.log("Current Directory:", getCurrentDirectory());
            break;

        case "environment":
            const environment = getEnvironment();
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
