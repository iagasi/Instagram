"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var TokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});
exports.TokenDb = mongoose_1.default.model("token", TokenSchema);
