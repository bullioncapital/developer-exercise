"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
class Server {
    constructor(app) {
        this.app = app;
        this.app.use(express_1.default.static(path.resolve("./") + "/build/frontend"));
        this.app.get("/health", (req, res) => {
            res.send("App running");
        });
        this.app.get("*", (req, res) => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }
    start(port) {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}
exports.Server = Server;
