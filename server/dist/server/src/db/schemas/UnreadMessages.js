"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UnreadSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        default: "",
    },
    chatId: {
        type: String,
        default: "",
    },
});
exports.UnreadDb = mongoose_1.default.model("unreads", UnreadSchema);
