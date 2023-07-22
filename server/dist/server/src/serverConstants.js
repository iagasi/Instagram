"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUD_SECRET = exports.CLOUD_KEY = exports.CLOUD_NAME = exports.WS_URL = exports.SERVER_URL = exports.FRONTEND_URL = exports.MONGO_URI = void 0;
require("dotenv/config");
exports.MONGO_URI = process.env.MONGO_URI;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
exports.SERVER_URL = process.env.SERVER_URL;
exports.WS_URL = process.env.WS_URL;
exports.CLOUD_NAME = process.env.CLOUD_NAME;
exports.CLOUD_KEY = process.env.CLOUD_KEY;
exports.CLOUD_SECRET = process.env.CLOUD_SECRET;
