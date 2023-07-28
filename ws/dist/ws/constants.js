"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
