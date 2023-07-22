"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ws = void 0;
var http_1 = require("http");
var serverConstants_1 = require("./serverConstants");
var express_1 = __importDefault(require("express"));
function ws() {
    var connected = [];
    var app = (0, express_1.default)();
    var httpServer = (0, http_1.createServer)(app);
    var io = require("socket.io")(httpServer, {
        cors: {
            origin: serverConstants_1.FRONTEND_URL,
        },
    });
    io.on("connection", function (socket) {
        socket.on("setUser", function (user) {
            var isExist = connected.find(function (conUser) { return conUser._id === user._id; });
            if (!isExist && user) {
                connected.push(__assign(__assign({}, user), { socketId: socket.id }));
            }
            if (isExist) {
                isExist.socketId = socket.id;
            }
            socket.emit("setUserId", isExist === null || isExist === void 0 ? void 0 : isExist.socketId);
            socket.broadcast.emit("check-connection");
        });
        socket.on("connectedUsers", function (idies) {
            var users = [];
            idies.forEach(function (id) {
                var found = connected.find(function (user) { return user._id.toString() === id.toString(); });
                if (found) {
                    users.push(found);
                }
            });
            socket.emit("connectedUsers", users);
        });
        socket.on("isOnline", function (userId) {
            var found = connected.find(function (user) { return user._id.toString() === userId.toString(); });
            console.log(" //////////////////////////////////////////////////////////////////");
            console.log(found);
            socket.emit("isOnline", !!found);
        });
        socket.on("getSocketId", function (user) {
            var candidate = connected.find(function (conUser) { return conUser._id === user._id; });
            io.to(user.from).emit("getSocketId", candidate === null || candidate === void 0 ? void 0 : candidate.socketId);
        });
        socket.on("call", function (data) {
            if (!data.to) {
                console.log(" call to socket id undefned//////////////////////////////////////////////////////////////////");
            }
            io.to(data.to).emit("call", data);
        });
        socket.on("answer", function (data) {
            if (!data.to) {
                console.log(" answer to socket id undefned//////////////////////////////////////////////////////////////////");
            }
            io.to(data.to).emit("answer", data);
        });
        socket.on("disconnect", function () {
            connected = connected.filter(function (c) { return c.socketId !== socket.id; });
            socket.broadcast.emit("check-connection");
        });
    });
    httpServer.listen(serverConstants_1.WS_URL, function () {
        console.log("ws serwer");
    });
}
exports.ws = ws;
