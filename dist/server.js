"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
function startServer() {
    var server = http_1.default.createServer(function (req, res) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Klyister is online 😎\n");
    });
    server.listen(8080);
}
exports.default = startServer;
