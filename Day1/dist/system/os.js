"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperatingSystem = getOperatingSystem;
const node_os_1 = __importDefault(require("node:os"));
function getOperatingSystem() {
    const platform = node_os_1.default.platform();
    const architecture = node_os_1.default.arch();
    const release = node_os_1.default.release();
    return {
        platform, architecture, release
    };
}
//# sourceMappingURL=os.js.map