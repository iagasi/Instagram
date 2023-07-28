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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAcessToken = exports.validateAcessToken = exports.generateTokens = void 0;
var graphql_1 = require("graphql");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ACCESS_TOKEN_KEY = "secretFromEnvFile";
var REFRESH_TOKEN_KEY = "secretFromEnvFile";
var userService_1 = require("./userService");
var TokenDb_1 = require("../db/schemas/TokenDb");
var util_1 = require("util");
function generateTokens(payload) {
    var acessToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_KEY, {
        expiresIn: "15m",
    });
    var refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_KEY, {
        expiresIn: "10d",
    });
    return {
        acessToken: acessToken,
        refreshToken: refreshToken,
    };
}
exports.generateTokens = generateTokens;
function validateAcessToken(req) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer")[1];
    // console.log(req.headers.instacookie);
    var verify = null;
    if (token) {
        try {
            verify = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_KEY);
        }
        catch (e) {
            console.log("acess Expired");
        }
    }
    if (!token || !verify) {
        throw new graphql_1.GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    }
    return { token: token };
}
exports.validateAcessToken = validateAcessToken;
function refreshAcessToken(req) {
    return __awaiter(this, void 0, void 0, function () {
        var token, plainToken, decoded, refreshFoundToken, user, tokens, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.instacookie;
                    plainToken = null;
                    if (typeof token === "string") {
                        plainToken = token;
                    }
                    else if ((0, util_1.isArray)(token)) {
                        plainToken = token[0];
                    }
                    if (!(token && plainToken)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    decoded = jsonwebtoken_1.default.decode(plainToken);
                    if (!decoded) {
                        console.log("decoding error");
                        return [2 /*return*/];
                        throw new Error("token decoding Error");
                    }
                    return [4 /*yield*/, TokenDb_1.TokenDb.findOne({ userId: decoded._id })];
                case 2:
                    refreshFoundToken = _a.sent();
                    if (!refreshFoundToken) {
                        console.log("Token in db not Exists");
                        return [2 /*return*/];
                        throw new Error("Token in db not Exists");
                    }
                    else {
                        if (refreshFoundToken) {
                            try {
                                if (refreshFoundToken.refreshToken !== plainToken) {
                                    console.log("refreshFoundToken.refreshToken!==plainToken");
                                    return [2 /*return*/];
                                }
                            }
                            catch (e) {
                                console.log("refresh token INVALID");
                                return [2 /*return*/];
                            }
                        }
                    }
                    return [4 /*yield*/, userService_1.UserService.getSingleUser(decoded._id)];
                case 3:
                    user = _a.sent();
                    if (!user) {
                        console.log("!user");
                        console.log("no user");
                        return [2 /*return*/];
                        throw new Error("refreshToken user IsnFound");
                    }
                    tokens = generateTokens({ _id: user === null || user === void 0 ? void 0 : user._id, name: user === null || user === void 0 ? void 0 : user.name });
                    return [2 /*return*/, __assign(__assign({}, tokens), { user: user })];
                case 4:
                    e_1 = _a.sent();
                    throw new graphql_1.GraphQLError("Ist authenticated" + e_1, {
                        extensions: {
                            code: "UNAUTHENTICATED",
                            http: { status: 405 },
                        },
                    });
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.refreshAcessToken = refreshAcessToken;
