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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
require("amd-loader");
var server_1 = require("@apollo/server");
var userResolver_1 = require("./resolvers/userResolver");
var merge_1 = require("@graphql-tools/merge");
var postResolver_1 = require("./resolvers/postResolver");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var fileResolver_1 = require("./resolvers/fileResolver");
var ws_1 = require("ws");
var ws_2 = require("graphql-ws/lib/use/ws");
var schema_1 = require("@graphql-tools/schema");
var http_1 = require("http");
var drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
var body_parser_1 = __importDefault(require("body-parser"));
var express4_1 = require("@apollo/server/express4");
var chatResolver_1 = require("./resolvers/chatResolver");
var tokenservice_1 = require("./services/tokenservice");
var refreshTokenController_1 = require("./resolvers/refreshTokenController");
var authController_1 = require("./resolvers/authController");
var db_1 = require("./db");
var serverConstants_1 = require("./serverConstants");
var resolvers = (0, merge_1.mergeResolvers)([userResolver_1.userResolvers, postResolver_1.postResolvers, chatResolver_1.chatResolver]);
var typeDefs = (0, merge_1.mergeTypeDefs)([userResolver_1.userTypeDefs, postResolver_1.postTypeDefs, chatResolver_1.chatTypeDefs]);
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var schema, app, httpServer, wsServer, serverCleanup, server;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!serverConstants_1.FRONTEND_URL || !serverConstants_1.SERVER_URL) {
                        console.log("frontend or server url ERROR");
                        return [2 /*return*/];
                    }
                    schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });
                    app = (0, express_1.default)();
                    (0, db_1.connectDb)();
                    app.use(express_1.default.json());
                    app.use((0, cors_1.default)({
                        origin: [serverConstants_1.FRONTEND_URL, "http://localhost:3000"],
                        credentials: true,
                        allowedHeaders: [
                            'Access-Control-Allow-Origin',
                            'Content-Type',
                            'Authorization',
                        ],
                        exposedHeaders: ["Set-Cookie",],
                    }));
                    app.use((0, cookie_parser_1.default)());
                    app.use("/", authController_1.authApi);
                    app.use("/", refreshTokenController_1.refreshTokensApi);
                    app.use(express_1.default.static("public"));
                    app.use("/file", fileResolver_1.fileRouter);
                    httpServer = (0, http_1.createServer)(app);
                    wsServer = new ws_1.WebSocketServer({
                        server: httpServer,
                        path: "/graphql",
                    });
                    serverCleanup = (0, ws_2.useServer)({ schema: schema }, wsServer);
                    server = new server_1.ApolloServer({
                        schema: schema,
                        plugins: [
                            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer: httpServer }),
                            {
                                serverWillStart: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, {
                                                    drainServer: function () {
                                                        return __awaiter(this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, serverCleanup.dispose()];
                                                                    case 1:
                                                                        _a.sent();
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        });
                                                    },
                                                }];
                                        });
                                    });
                                },
                            },
                        ],
                    });
                    return [4 /*yield*/, server.start()];
                case 1:
                    _a.sent();
                    app.use("/graphql", (0, cors_1.default)({
                        origin: [serverConstants_1.FRONTEND_URL, serverConstants_1.SERVER_URL, "http://localhost:3000"],
                        credentials: true,
                    }), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
                        context: function (_a) {
                            var req = _a.req, res = _a.res;
                            return __awaiter(_this, void 0, void 0, function () {
                                var isValid;
                                return __generator(this, function (_b) {
                                    isValid = (0, tokenservice_1.validateAcessToken)(req);
                                    return [2 /*return*/, { req: req, res: res }];
                                });
                            });
                        },
                    }));
                    httpServer.listen({ port: 4000 }, function () {
                        console.log("\uD83D\uDE80 Server ready at ".concat(serverConstants_1.SERVER_URL, "/graphql"));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
start();
