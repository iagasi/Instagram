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
exports.postService = void 0;
var errors_1 = require("../errors");
var postDto_1 = require("../../../dto/postDto");
var userService_1 = require("./userService");
var Prefferences_1 = require("../db/schemas/Prefferences");
var Post_1 = require("../db/schemas/Post");
var Comments_1 = require("../db/schemas/Comments");
var User_1 = require("../db/schemas/User");
var clousdinaryService_1 = require("./clousdinaryService");
var postService = /** @class */ (function () {
    function postService() {
    }
    postService.getFriendsPosts = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var preffer, posts, _i, _a, userId_1, pref;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({ userId: userId })];
                    case 1:
                        preffer = _b.sent();
                        if (!preffer) {
                            return [2 /*return*/, []];
                        }
                        posts = [];
                        _i = 0, _a = preffer === null || preffer === void 0 ? void 0 : preffer.followings;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        userId_1 = _a[_i];
                        return [4 /*yield*/, Prefferences_1.PrefferenceDb.findOne({ userId: userId_1 })];
                    case 3:
                        pref = _b.sent();
                        if (pref) {
                            posts.push.apply(posts, pref === null || pref === void 0 ? void 0 : pref.posts);
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, posts];
                }
            });
        });
    };
    postService.getPostById = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var targetPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!postId) {
                            throw new errors_1.PostError("Id s Not provided");
                        }
                        return [4 /*yield*/, Post_1.PostsDb.findById(postId)];
                    case 1:
                        targetPost = _a.sent();
                        if (!targetPost) {
                            throw new errors_1.PostError("Post Not Found with this id");
                        }
                        return [2 /*return*/, targetPost];
                }
            });
        });
    };
    postService.likePost = function (postId, personId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUserPreffetences, targetPost, index, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userService_1.UserService.userPrefferences(personId)];
                    case 1:
                        foundUserPreffetences = _a.sent();
                        return [4 /*yield*/, Post_1.PostsDb.findById(postId)];
                    case 2:
                        targetPost = _a.sent();
                        if (!targetPost) {
                            return [2 /*return*/];
                        }
                        // if (targetPost.userId == personId) {
                        //   throw new PostError("You cannot like yout own Post");
                        // }
                        if (targetPost.likes.includes(personId.toString())) {
                            targetPost.likes = targetPost.likes.filter(function (e) { return e !== personId.toString(); });
                        }
                        else {
                            targetPost.likes.push(personId.toString());
                        }
                        if (foundUserPreffetences === null || foundUserPreffetences === void 0 ? void 0 : foundUserPreffetences.saved.includes(postId)) {
                            index = foundUserPreffetences.saved.indexOf(postId);
                            foundUserPreffetences.saved.splice(index, 1);
                        }
                        else {
                            foundUserPreffetences === null || foundUserPreffetences === void 0 ? void 0 : foundUserPreffetences.saved.push(postId);
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, (targetPost === null || targetPost === void 0 ? void 0 : targetPost.save())];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (foundUserPreffetences === null || foundUserPreffetences === void 0 ? void 0 : foundUserPreffetences.save())];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, targetPost];
                }
            });
        });
    };
    postService.commentPost = function (postId, personId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var targetPost, createComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPostById(postId)];
                    case 1:
                        targetPost = _a.sent();
                        if (!targetPost) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Comments_1.CommentsDb({
                                personId: personId,
                                message: message,
                                postId: postId,
                                time: Date.now().toString(),
                            }).save()];
                    case 2:
                        createComment = _a.sent();
                        targetPost.comments.push(createComment._id);
                        return [4 /*yield*/, targetPost.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, createComment._id];
                }
            });
        });
    };
    postService.getPostCommentsAndAuthors = function (postId) {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var post, commentsArray, _d, _e, _f, commetId, comment, user, commentAndItMaker, e_2_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.getPostById(postId)];
                    case 1:
                        post = _g.sent();
                        commentsArray = [];
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 11, 12, 17]);
                        _d = true, _e = __asyncValues(post.comments);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 10];
                        _c = _f.value;
                        _d = false;
                        _g.label = 5;
                    case 5:
                        _g.trys.push([5, , 8, 9]);
                        commetId = _c;
                        return [4 /*yield*/, Comments_1.CommentsDb.findById(commetId)];
                    case 6:
                        comment = (_g.sent());
                        if (!comment) {
                            throw new Error("comment not found");
                        }
                        return [4 /*yield*/, User_1.UserDb.findById(comment.personId)];
                    case 7:
                        user = (_g.sent());
                        if (!user) {
                            throw new Error("user not found");
                        }
                        commentAndItMaker = {
                            commentMaker: user,
                            comment: comment,
                        };
                        commentsArray.push(commentAndItMaker);
                        return [3 /*break*/, 9];
                    case 8:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 3];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _g.trys.push([12, , 15, 16]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _b.call(_e)];
                    case 13:
                        _g.sent();
                        _g.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, commentsArray];
                }
            });
        });
    };
    postService.getPostLikedPersons = function (postId) {
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var post, users, _d, _e, _f, userId, user, e_3_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.getPostById(postId)];
                    case 1:
                        post = _g.sent();
                        users = [];
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 10, 11, 16]);
                        _d = true, _e = __asyncValues(post.likes);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 9];
                        _c = _f.value;
                        _d = false;
                        _g.label = 5;
                    case 5:
                        _g.trys.push([5, , 7, 8]);
                        userId = _c;
                        return [4 /*yield*/, userService_1.UserService.getSingleUser(userId)];
                    case 6:
                        user = _g.sent();
                        if (user) {
                            users.push(user);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _g.trys.push([11, , 14, 15]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(_e)];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, users];
                }
            });
        });
    };
    postService.uploadPostImage = function (userId, file) {
        return __awaiter(this, void 0, void 0, function () {
            var userPrefferences, filename, post, newPost, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userService_1.UserService.userPrefferences(userId)];
                    case 1:
                        userPrefferences = _a.sent();
                        if (!userPrefferences) {
                            return [2 /*return*/];
                        }
                        if (!file) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, clousdinaryService_1.cloudinaryService.uploadFile(userId, "images", file)];
                    case 3:
                        filename = _a.sent();
                        if (!filename) return [3 /*break*/, 6];
                        post = new postDto_1.PostDto(userId, filename);
                        return [4 /*yield*/, new Post_1.PostsDb(__assign({}, post)).save()];
                    case 4:
                        newPost = _a.sent();
                        userPrefferences.posts.push(newPost._id);
                        return [4 /*yield*/, userPrefferences.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, "uploaded"];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_4 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    postService.deletePost = function (userId, postId) {
        return __awaiter(this, void 0, void 0, function () {
            var post, userPrefferences, filteredPrefferences, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, postService.getPostById(postId)];
                    case 1:
                        post = _a.sent();
                        return [4 /*yield*/, userService_1.UserService.userPrefferences(userId.toString())];
                    case 2:
                        userPrefferences = _a.sent();
                        if (!userPrefferences) return [3 /*break*/, 5];
                        clousdinaryService_1.cloudinaryService.removeFile(post.image);
                        filteredPrefferences = userPrefferences === null || userPrefferences === void 0 ? void 0 : userPrefferences.posts.filter(function (id) { return id.toString() !== postId; });
                        userPrefferences.posts = filteredPrefferences;
                        return [4 /*yield*/, userPrefferences.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Post_1.PostsDb.deleteOne({ _id: postId })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_5 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    postService.interestingPosts = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var interesting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Post_1.PostsDb.find().sort({ _id: -1 }).limit(50)];
                    case 1:
                        interesting = _a.sent();
                        return [2 /*return*/, interesting];
                }
            });
        });
    };
    return postService;
}());
exports.postService = postService;
