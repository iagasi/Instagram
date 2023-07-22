"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var MessagesSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        default: "",
        ref: "user"
    },
    chatId: {
        type: String,
        default: "",
        ref: "chats"
    },
    message: {
        type: String,
        default: "",
    },
    timeStamp: {
        type: String,
        default: "",
    },
});
exports.MessageDb = mongoose_1.default.model("messages", MessagesSchema);
