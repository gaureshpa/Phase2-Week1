"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemoryInformation = getMemoryInformation;
const node_os_1 = __importDefault(require("node:os"));
function getMemoryInformation() {
    const total = node_os_1.default.totalmem();
    const free = node_os_1.default.freemem();
    return {
        total, free
    };
}
//# sourceMappingURL=memory.js.map