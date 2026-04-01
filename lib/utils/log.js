"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
function log(str) {
    let logLevel = process.env.CH_NODE_UTILS_LOG_LVL;
    if (logLevel) {
        logLevel = logLevel.toUpperCase();
        switch (logLevel) {
            case "TRACE":
            case "DEBUG":
                console.log(`ch-node-utils - ${logLevel}: ${str}`);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=log.js.map