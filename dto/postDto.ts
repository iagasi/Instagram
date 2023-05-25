import { UserType, UserPrefferencesType } from "../types/userType";
import { postType } from "../types/postType";

export class PostDto implements postType {
  _id: string;
  userId: string;
  image: string;
  likes: string[];
  comments: string[];
  constructor(userId: string, image: string) {
    this._id = (Math.random() * 10).toString();
    this.userId = userId;
    this.image = image;
    this.likes = [];
    this.comments = [];
  }
}
