"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ws = void 0;
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
console.log(constants_1.PORT);
function ws() {
    let connected = [];
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    app.use((0, cors_1.default)({
        origin: [constants_1.FRONTEND_URL || "", "http://localhost:3000"],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Credentials", "instacookie", "Access-Control-Allow-Origin"],
    }));
    const io = require("socket.io")(httpServer, {
        cors: {
            origin: constants_1.FRONTEND_URL,
        },
    });
    io.on("connection", (socket) => {
        socket.on("setUser", (user) => {
            const isExist = connected.find((conUser) => conUser._id === user._id);
            if (!isExist && user) {
                connected.push(Object.assign(Object.assign({}, user), { socketId: socket.id }));
            }
            if (isExist) {
                isExist.socketId = socket.id;
            }
            socket.emit("setUserId", isExist === null || isExist === void 0 ? void 0 : isExist.socketId);
            socket.broadcast.emit("check-connection");
            console.log("connected");
        });
        socket.on("connectedUsers", (idies) => {
            const users = [];
            idies.forEach((id) => {
                const found = connected.find((user) => user._id.toString() === id.toString());
                if (found) {
                    users.push(found);
                }
            });
            socket.emit("connectedUsers", users);
        });
        socket.on("isOnline", (userId) => {
            const found = connected.find((user) => user._id.toString() === userId.toString());
            console.log(" //////////////////////////////////////////////////////////////////");
            console.log(found);
            socket.emit("isOnline", !!found);
        });
        socket.on("getSocketId", (user) => {
            const candidate = connected.find((conUser) => conUser._id === user._id);
            io.to(user.from).emit("getSocketId", candidate === null || candidate === void 0 ? void 0 : candidate.socketId);
        });
        socket.on("call", (data) => {
            if (!data.to) {
                console.log(" call to socket id undefned//////////////////////////////////////////////////////////////////");
            }
            io.to(data.to).emit("call", data);
        });
        socket.on("answer", (data) => {
            if (!data.to) {
                console.log(" answer to socket id undefned//////////////////////////////////////////////////////////////////");
            }
            io.to(data.to).emit("answer", data);
        });
        socket.on("disconnect", () => {
            connected = connected.filter((c) => c.socketId !== socket.id);
            socket.broadcast.emit("check-connection");
        });
    });
    httpServer.listen(constants_1.PORT, () => {
        console.log("ws serwer" + constants_1.PORT);
    });
}
exports.ws = ws;
ws();
