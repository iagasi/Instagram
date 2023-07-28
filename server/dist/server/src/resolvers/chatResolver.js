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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatTypeDefs = exports.chatResolver = void 0;
var chatDb_1 = require("../services/chatDb");
var userService_1 = require("../services/userService");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var pubsub = new graphql_subscriptions_1.PubSub();
function newMessage(message) {
    return __awaiter(this, void 0, void 0, function () {
        var chat, friendId, createdMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chatDb_1.ChatService.getSingleChat(message.chatId)];
                case 1:
                    chat = _a.sent();
                    friendId = chat === null || chat === void 0 ? void 0 : chat.users.find(function (id) { return message.userId.toString() !== id.toString(); });
                    if (!friendId) return [3 /*break*/, 3];
                    return [4 /*yield*/, chatDb_1.ChatService.unreadMessageSet({
                            userId: friendId,
                            chatId: message === null || message === void 0 ? void 0 : message.chatId,
                        })];
                case 2:
                    createdMessage = _a.sent();
                    pubsub.publish("LISTEN_MESSAGE", { listenMessages: createdMessage });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function newMessaesPermisions(message, subscribedUserId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, subscribedUserId.toString() === message.userId.toString()];
        });
    });
}
function message(message) {
    return __awaiter(this, void 0, void 0, function () {
        var createdMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chatDb_1.ChatService.addMessage({
                        chatId: message.chatId,
                        message: message.message,
                        userId: message.userId,
                        timeStamp: Date.now().toString(),
                    })];
                case 1:
                    createdMessage = _a.sent();
                    pubsub.publish("MESSAGE", { receiveMessage: createdMessage });
                    return [2 /*return*/];
            }
        });
    });
}
exports.chatResolver = {
    Query: {
        getChats: function (paretn, args) {
            var _a, e_1, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var res, chats, _d, chats_1, chats_1_1, chat, friendId, friendData, e_1_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            res = [];
                            return [4 /*yield*/, chatDb_1.ChatService.getchats(args.userId)];
                        case 1:
                            chats = _e.sent();
                            if (!chats)
                                return [2 /*return*/];
                            _e.label = 2;
                        case 2:
                            _e.trys.push([2, 8, 9, 14]);
                            _d = true, chats_1 = __asyncValues(chats);
                            _e.label = 3;
                        case 3: return [4 /*yield*/, chats_1.next()];
                        case 4:
                            if (!(chats_1_1 = _e.sent(), _a = chats_1_1.done, !_a)) return [3 /*break*/, 7];
                            _c = chats_1_1.value;
                            _d = false;
                            chat = _c;
                            friendId = null;
                            friendId = chat.users.find(function (e) { return e.toString() !== args.userId.toString(); });
                            if (!friendId)
                                return [2 /*return*/, "userNot found"];
                            return [4 /*yield*/, userService_1.UserService.getSingleUser(friendId)];
                        case 5:
                            friendData = _e.sent();
                            res.push({
                                chat: chat,
                                chatWithInfo: friendData,
                            });
                            _e.label = 6;
                        case 6:
                            _d = true;
                            return [3 /*break*/, 3];
                        case 7: return [3 /*break*/, 14];
                        case 8:
                            e_1_1 = _e.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 14];
                        case 9:
                            _e.trys.push([9, , 12, 13]);
                            if (!(!_d && !_a && (_b = chats_1.return))) return [3 /*break*/, 11];
                            return [4 /*yield*/, _b.call(chats_1)];
                        case 10:
                            _e.sent();
                            _e.label = 11;
                        case 11: return [3 /*break*/, 13];
                        case 12:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 13: return [7 /*endfinally*/];
                        case 14: return [2 /*return*/, res];
                    }
                });
            });
        },
        getMessages: function (paretn, args) {
            return __awaiter(this, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, chatDb_1.ChatService.getchatsMessages(args.chatId)];
                        case 1:
                            messages = _a.sent();
                            return [2 /*return*/, messages];
                    }
                });
            });
        },
        unreadMessagesGet: function (paretn, args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, chatDb_1.ChatService.unreadMessageGet(args.userId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
    },
    Mutation: {
        sendMessage: function (p, args) { return __awaiter(void 0, void 0, void 0, function () {
            var chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chatDb_1.ChatService.getSingleChat(args.input.chatId)];
                    case 1:
                        chat = _a.sent();
                        if (chat && chat.users.includes(args.input.userId)) {
                            newMessage(args.input);
                            message(args.input);
                        }
                        else {
                            throw new Error("You  are not allowed write int this chat");
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        createChat: function (parrent, args) {
            return chatDb_1.ChatService.createChat(args.input.user1Id, args.input.user2Id);
        },
        deleteChat: function (parrent, args) {
            return chatDb_1.ChatService.deleteChat(args.input.chatId, args.input.userId);
        },
        unreadMessageSet: function (parrent, args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    chatDb_1.ChatService.unreadMessageSet(args.input);
                    return [2 /*return*/];
                });
            });
        },
        unreadChatMessagesDelete: function (parrent, args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, chatDb_1.ChatService.unreadChatMessagesDelete(args.input.chatId, args.input.userId)];
                });
            });
        }
    },
    Subscription: {
        receiveMessage: {
            subscribe: (0, graphql_subscriptions_1.withFilter)(function (parrent, args) {
                return pubsub.asyncIterator(["MESSAGE"]);
            }, function (payload, args) {
                var subscribeToChat = args.input.chatId;
                var receivedMessageInChat = payload.receiveMessage.chatId;
                return subscribeToChat === receivedMessageInChat;
            }),
            // subscribe:()=>pubsub.asyncIterator(["MESSAGE"])
        },
        listenMessages: {
            subscribe: (0, graphql_subscriptions_1.withFilter)(function (parrent, args) {
                // console.log("unread subscribe111");
                return pubsub.asyncIterator(["LISTEN_MESSAGE"]);
            }, function (payload, args) { return __awaiter(void 0, void 0, void 0, function () {
                var subscribedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            subscribedUser = args.input.userId;
                            return [4 /*yield*/, newMessaesPermisions(payload.listenMessages, subscribedUser)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }),
        },
    },
};
exports.chatTypeDefs = "#graphql\ntype MessagaeType{\n  _id:String\n  chatId: String\n  message: String\n  timeStamp: String\n  userId:String\n}\n\ntype chatType{\n  _id: String,\n   users:[String]\n\n}\ntype messageType{\n    \n    _id: String,\n    chatId: String,\n    message: String,\n    timeStamp:String,\n    userId: String,\n  \n}\ntype UserType{\n  _id:String\n   name: String\n   surname: String\n   image:String\n }\n\n type GetChatsType{\n  chat:chatType\n  chatWithInfo:UserType\n }\n\n type unreadMessageType{\n  _id:String\n  userId:String\n  chatId:String\n}\n\n\n  type Query {\n    getChats(userId:String):[GetChatsType]\n    getMessages(chatId:String):[messageType]\n    unreadMessagesGet(userId:String):[unreadMessageType]\n  }\ninput inputReceiveMessage{\n  _id:String\n  chatId: String\n  message: String\n  timeStamp: String\n  userId:String\n}\n\n\n  type Subscription {\n    receiveMessage(input:inputReceiveMessage): MessagaeType\n    listenMessages(input:inputReceiveMessage):unreadMessageType\n  }\n\n\n  input MessageInput{\n  chatId: String\n  message: String\n  timeStamp: String\n  userId: String\n  }\n\n  input CreateChatInput{\n    user1Id:String\n    user2Id:String\n  }\n  type CreateChatType{\n    _id:String\n    users:[String]\n  }\n\n  input deleteChatInput{\n    chatId:String\n    userId:String\n  }\n\n  input unreadMessageInput{\n    userId:String\n    chatId:String\n  }\n  input deleteUnreadType{\n    chatId:String\n    userId:String\n  }\n  type Mutation{\n    sendMessage(input:MessageInput):MessagaeType\n    createChat(input:CreateChatInput): CreateChatType\n    deleteChat(input:deleteChatInput):String\n  unreadMessageSet(input: unreadMessageInput):String\n  unreadChatMessagesDelete(input:deleteUnreadType):String\n  }\n";
