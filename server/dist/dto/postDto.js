"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
var PostDto = /** @class */ (function () {
    function PostDto(userId, image) {
        this.userId = userId;
        this.image = image;
        this.likes = [];
        this.comments = [];
    }
    return PostDto;
}());
exports.PostDto = PostDto;
