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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var userDto_1 = require("../../../dto/userDto");
var bcrypt_1 = __importDefault(require("bcrypt"));
var tokenservice_1 = require("./tokenservice");
var User_1 = require("../db/schemas/User");
var TokenDb_1 = require("../db/schemas/TokenDb");
var Prefferences_1 = require("../db/schemas/Prefferences");
var mongodb_1 = require("mongodb");
var saltRounds = 10;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.register = function (_a) {
        var email = _a.email, name = _a.name, password = _a.password, surname = _a.surname;
        return __awaiter(this, void 0, void 0, function () {
            var candidate, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (password.length < 6) {
                            return [2 /*return*/, "password length must be 6 or greater"];
                        }
                        return [4 /*yield*/, User_1.UserDb.findOne({ email: email })];
                    case 1:
                        candidate = _b.sent();
                        if (!candidate) {
                            bcrypt_1.default.hash(password, saltRounds, function (err, hash) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var doc, prefferenceDoc;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (err) {
                                                    return [2 /*return*/, "bcrypt error"];
                                                }
                                                doc = new User_1.UserDb({
                                                    email: email,
                                                    password: hash,
                                                    name: name,
                                                    surname: surname,
                                                });
                                                return [4 /*yield*/, doc.save()];
                                            case 1:
                                                _a.sent();
                                                doc._id;
                                                prefferenceDoc = new Prefferences_1.PrefferenceDb();
                                                prefferenceDoc.userId = doc._id;
                                                return [4 /*yield*/, prefferenceDoc.save()];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                            return [2 /*return*/, "Sucessfully registered"];
                        }
                        else {
                            return [2 /*return*/, "This Email Already  registered"];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.login = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.UserDb.findOne({ email: email.trim() })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Email or Password incorrect");
                        }
                        return [2 /*return*/, new Promise(function (resolve, rej) {
                                bcrypt_1.default.compare(password, user.password, function (err, result) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var res, refreshToken, newToken;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (err) {
                                                    }
                                                    if (!!result) return [3 /*break*/, 1];
                                                    rej(new Error("Email or Password incorrect"));
                                                    return [3 /*break*/, 7];
                                                case 1:
                                                    res = (0, tokenservice_1.generateTokens)({ _id: user._id, name: user.name });
                                                    return [4 /*yield*/, TokenDb_1.TokenDb.findOne({ userId: user._id })];
                                                case 2:
                                                    refreshToken = _a.sent();
                                                    if (!refreshToken) return [3 /*break*/, 4];
                                                    refreshToken.refreshToken = res.refreshToken;
                                                    return [4 /*yield*/, refreshToken.save()];
                                                case 3:
                                                    _a.sent();
                                                    return [3 /*break*/, 6];
                                                case 4:
                                                    newToken = new TokenDb_1.TokenDb({
                                                        userId: user._id,
                                                        refreshToken: res.refreshToken,
                                                    });
                                                    return [4 /*yield*/, newToken.save()];
                                                case 5:
                                                    _a.sent();
                                                    _a.label = 6;
                                                case 6:
                                                    resolve({
                                                        userId: user._id.toString(),
                                                        acessToken: res.acessToken,
                                                        refreshToken: res.refreshToken,
                                                    });
                                                    _a.label = 7;
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    });
                                });
                            })];
                }
            });
        });
    };
    UserService.userPrefferences = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({ userId: new mongodb_1.ObjectId(userId) })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.getUsers = function (userIds) {
        var _a, userIds_1, userIds_1_1;
        var _b, e_2, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var res, id, candidate, e_2_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        res = [];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 13]);
                        _a = true, userIds_1 = __asyncValues(userIds);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, userIds_1.next()];
                    case 3:
                        if (!(userIds_1_1 = _e.sent(), _b = userIds_1_1.done, !_b)) return [3 /*break*/, 6];
                        _d = userIds_1_1.value;
                        _a = false;
                        id = _d;
                        return [4 /*yield*/, this.getSingleUser(id)];
                    case 4:
                        candidate = _e.sent();
                        if (candidate) {
                            res.push(candidate);
                        }
                        _e.label = 5;
                    case 5:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _e.trys.push([8, , 11, 12]);
                        if (!(!_a && !_b && (_c = userIds_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _c.call(userIds_1)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, res];
                }
            });
        });
    };
    UserService.getSingleUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.UserDb.findById(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.getUserData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, prefferences;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleUser(userId)];
                    case 1:
                        user = (_a.sent());
                        if (user) {
                            prefferences = this.userPrefferences(user === null || user === void 0 ? void 0 : user._id);
                            return [2 /*return*/, { user: user, prefferences: prefferences }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.findPersonsByNameAndSurname = function (searchCase) {
        return __awaiter(this, void 0, void 0, function () {
            var regex, persons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regex = new RegExp(searchCase, "i");
                        return [4 /*yield*/, User_1.UserDb.find({
                                $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }],
                            })];
                    case 1:
                        persons = _a.sent();
                        return [2 /*return*/, persons];
                }
            });
        });
    };
    UserService.getUserFriends = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, res, followers, followings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userPrefferences(id)];
                    case 1:
                        user = _a.sent();
                        res = {
                            followers: [],
                            followings: [],
                        };
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getUsers(user === null || user === void 0 ? void 0 : user.followers)];
                    case 2:
                        followers = _a.sent();
                        return [4 /*yield*/, this.getUsers(user === null || user === void 0 ? void 0 : user.followings)];
                    case 3:
                        followings = _a.sent();
                        res.followers = followers;
                        res.followings = followings;
                        _a.label = 4;
                    case 4: return [2 /*return*/, res];
                }
            });
        });
    };
    UserService.deleteFollowing = function (myId, candidateId) {
        return __awaiter(this, void 0, void 0, function () {
            var iAmUser, userConfig, unfollowMeFromConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleUser(myId)];
                    case 1:
                        iAmUser = _a.sent();
                        if (!iAmUser) return [3 /*break*/, 6];
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({ userId: myId })];
                    case 2:
                        userConfig = _a.sent();
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({
                                userId: candidateId,
                            })];
                    case 3:
                        unfollowMeFromConfig = _a.sent();
                        if (!(userConfig && unfollowMeFromConfig)) return [3 /*break*/, 6];
                        userConfig.followings = userConfig.followings.filter(function (id) { return id !== candidateId; });
                        unfollowMeFromConfig.followers = unfollowMeFromConfig.followers.filter(function (id) { return id !== myId; });
                        return [4 /*yield*/, userConfig.save()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, unfollowMeFromConfig.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, new userDto_1.UserAndPrefferencesDto(iAmUser, userConfig)];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UserService.deleteFollower = function (myId, candidateId) {
        return __awaiter(this, void 0, void 0, function () {
            var iAmUser, candidate, userConfig, unfollowFromMeConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleUser(myId)];
                    case 1:
                        iAmUser = _a.sent();
                        return [4 /*yield*/, this.getSingleUser(candidateId)];
                    case 2:
                        candidate = _a.sent();
                        if (!iAmUser) return [3 /*break*/, 8];
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({ userId: iAmUser._id })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOneAndUpdate({
                                userId: iAmUser._id,
                            })];
                    case 4:
                        userConfig = _a.sent();
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({
                                userId: candidateId,
                            })];
                    case 5:
                        unfollowFromMeConfig = _a.sent();
                        if (!(userConfig && candidate)) return [3 /*break*/, 8];
                        userConfig.followings = userConfig.followings.filter(function (id) { return id !== candidateId; });
                        userConfig.followers = userConfig.followers.filter(function (id) { return id !== candidateId; });
                        return [4 /*yield*/, userConfig.save()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, (unfollowFromMeConfig === null || unfollowFromMeConfig === void 0 ? void 0 : unfollowFromMeConfig.save())];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, new userDto_1.UserAndPrefferencesDto(iAmUser, userConfig)];
                    case 8: return [2 /*return*/, null];
                }
            });
        });
    };
    UserService.subscribe = function (myId, candidateId) {
        return __awaiter(this, void 0, void 0, function () {
            var iAmUser, subscribeTo, userConfig, subscribeToConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleUser(myId)];
                    case 1:
                        iAmUser = _a.sent();
                        return [4 /*yield*/, this.getSingleUser(candidateId)];
                    case 2:
                        subscribeTo = _a.sent();
                        if (!(iAmUser && subscribeTo)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({ userId: iAmUser._id })];
                    case 3:
                        userConfig = _a.sent();
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({
                                userId: subscribeTo._id,
                            })];
                    case 4:
                        subscribeToConfig = _a.sent();
                        if (!(userConfig && iAmUser)) return [3 /*break*/, 7];
                        if (userConfig.followings.includes(candidateId))
                            throw new Error("Yoy alredy subscribed");
                        userConfig.followings.push(candidateId);
                        subscribeToConfig === null || subscribeToConfig === void 0 ? void 0 : subscribeToConfig.followers.push(myId);
                        return [4 /*yield*/, userConfig.save()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, (subscribeToConfig === null || subscribeToConfig === void 0 ? void 0 : subscribeToConfig.save())];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, new userDto_1.UserAndPrefferencesDto(iAmUser, userConfig)];
                    case 7: return [2 /*return*/, null];
                }
            });
        });
    };
    UserService.changeNameSurname = function (myId, name, surname) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleUser(myId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/];
                        if (name)
                            user.name = name;
                        if (surname)
                            user.surname = surname;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
