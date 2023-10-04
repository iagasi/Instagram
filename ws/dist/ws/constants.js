"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS_PORT = exports.WS_HOST = exports.FRONTEND_URL = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.WS_PORT;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
exports.WS_HOST = process.env.WS_HOST;
exports.WS_PORT = process.env.WS_PORT;
