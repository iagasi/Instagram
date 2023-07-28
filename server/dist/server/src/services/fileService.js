"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uuid_random_1 = __importDefault(require("uuid-random"));
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.prototype.uploadFile = function (userId, destination, fileBuffer) {
        var buffer = fileBuffer === null || fileBuffer === void 0 ? void 0 : fileBuffer.buffer;
        if (!buffer)
            return;
        var randomName = (0, uuid_random_1.default)() + fileBuffer.originalname;
        var PATH = path_1.default.join(__dirname, "../../public", destination, randomName);
        fs_1.default.writeFile(PATH, buffer, function (err) {
            if (err) {
                throw new Error("File saving error" + err.message);
            }
        });
        return destination + "/" + randomName;
    };
    FileService.prototype.removeFile = function (filePath) {
        var p = path_1.default.join(__dirname, "../../public", filePath);
        if (fs_1.default.existsSync(p) && filePath) {
            fs_1.default.unlink(p, function (err) {
                if (err) {
                }
            });
        }
        else {
        }
    };
    return FileService;
}());
exports.fileService = new FileService();
