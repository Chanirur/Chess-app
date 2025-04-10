"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
let games = [];
function onSocketPreError(e) {
    console.log(e);
}
function onSocketPostError(e) {
    console.log(e);
}
console.log(`Attempting to run server on port ${port}`);
const s = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
const wss = new ws_1.WebSocketServer({ noServer: true });
s.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketPreError);
    // perform auth
    if (!!req.headers['BadAuth']) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
        socket.removeListener('error', onSocketPreError);
        wss.emit('connection', ws, req);
    });
});
wss.on('connection', (ws, req) => {
    ws.on('error', onSocketPostError);
    ws.on('message', (msg, isBinary) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(msg, { binary: isBinary });
            }
        });
    });
    ws.on('close', () => {
        console.log('Connection closed');
    });
});
