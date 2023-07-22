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
exports.fileRouter = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1.default)();
var userService_1 = require("../services/userService");
var postsService_1 = require("../services/postsService");
var clousdinaryService_1 = require("../services/clousdinaryService");
router.put("/user-photo/:id", upload.single("File"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, savedImage, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                if (!userId)
                    return [2 /*return*/, res.send("userId uncnown")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userService_1.UserService.getSingleUser(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, console.log(" user not found")];
                }
                return [4 /*yield*/, clousdinaryService_1.cloudinaryService.removeFile(user === null || user === void 0 ? void 0 : user.image)];
            case 3:
                _a.sent();
                return [4 /*yield*/, clousdinaryService_1.cloudinaryService.uploadFile(user._id.toString(), "user-images", req.file)];
            case 4:
                savedImage = _a.sent();
                if (savedImage) {
                    user.image = savedImage;
                    user.save();
                }
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 6];
            case 6:
                res.send("ok");
                return [2 /*return*/];
        }
    });
}); });
router.delete("/user-photo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userService_1.UserService.getSingleUser(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, console.log(" user not found")];
                }
                return [4 /*yield*/, clousdinaryService_1.cloudinaryService.removeFile(user === null || user === void 0 ? void 0 : user.image)];
            case 3:
                _a.sent();
                user.image = "";
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 6];
            case 6:
                res.send("ok");
                return [2 /*return*/];
        }
    });
}); });
router.put("/upload-post/:id", upload.single("File"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                return [4 /*yield*/, postsService_1.postService.uploadPostImage(userId, req.file)];
            case 1:
                _a.sent();
                res.send("ok");
                return [2 /*return*/];
        }
    });
}); });
router.delete("/upload-post/:id/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.id;
                userId = req.params.userId;
                return [4 /*yield*/, postsService_1.postService.deletePost(userId, postId)];
            case 1:
                status = _a.sent();
                res.send("ok");
                return [2 /*return*/];
        }
    });
}); });
exports.fileRouter = router;
