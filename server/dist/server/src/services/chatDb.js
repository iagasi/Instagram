"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
var Chats_1 = require("../db/schemas/Chats");
var Messages_1 = require("../db/schemas/Messages");
var UnreadMessages_1 = require("../db/schemas/UnreadMessages");
exports.ChatService = {
    getSingleChat: function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Chats_1.ChatDb.findById(chatId)];
                    case 1:
                        chat = _a.sent();
                        return [2 /*return*/, chat];
                }
            });
        });
    },
    getchats: function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var myChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Chats_1.ChatDb.find({ users: { $all: [userId] } })];
                    case 1:
                        myChat = _a.sent();
                        return [2 /*return*/, myChat];
                }
            });
        });
    },
    getchatsMessages: function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var myChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Messages_1.MessageDb.find({ chatId: chatId })];
                    case 1:
                        myChat = _a.sent();
                        if (myChat) {
                            myChat.sort(function (a, b) { return Number(a.timeStamp) - Number(b.timeStamp); });
                        }
                        return [2 /*return*/, myChat];
                }
            });
        });
    },
    addMessage: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var newMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Messages_1.MessageDb(message).save()];
                    case 1:
                        newMessage = _a.sent();
                        return [2 /*return*/, newMessage];
                }
            });
        });
    },
    eleteMessage: function d(messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Messages_1.MessageDb.findByIdAndDelete(messageId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    deleteChat: function (chatId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Messages_1.MessageDb.deleteMany({ chatId: chatId })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Chats_1.ChatDb.findByIdAndDelete(chatId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, UnreadMessages_1.UnreadDb.deleteMany({ chatId: chatId })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, chatId];
                }
            });
        });
    },
    createChat: function (user1Id, user2Id) {
        return __awaiter(this, void 0, void 0, function () {
            var ischatExist, newChat, createdchat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Chats_1.ChatDb.findOne({ users: { $all: [user1Id, user2Id] } })];
                    case 1:
                        ischatExist = _a.sent();
                        if (ischatExist) {
                            console.log("Chat already exists");
                            return [2 /*return*/, "Chat already exists"];
                            throw Error();
                        }
                        newChat = {
                            userId: user1Id,
                            users: [user2Id, user1Id,],
                        };
                        return [4 /*yield*/, new Chats_1.ChatDb(newChat).save()];
                    case 2:
                        createdchat = _a.sent();
                        return [2 /*return*/, createdchat];
                }
            });
        });
    },
    unreadMessageGet: function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UnreadMessages_1.UnreadDb.find({ userId: userId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    unreadChatMessagesDelete: function (chatId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UnreadMessages_1.UnreadDb.deleteMany({ $and: [{ chatId: chatId }, { userId: userId }] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "ok"];
                }
            });
        });
    },
    unreadMessageSet: function (unread) {
        return __awaiter(this, void 0, void 0, function () {
            var unreadMessage, unreades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unreadMessage = new UnreadMessages_1.UnreadDb(unread);
                        return [4 /*yield*/, unreadMessage.save()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, UnreadMessages_1.UnreadDb.findById(unreadMessage._id)];
                    case 2:
                        unreades = _a.sent();
                        return [2 /*return*/, unreades];
                }
            });
        });
    },
};
