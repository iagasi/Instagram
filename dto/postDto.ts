import { UserType, UserPrefferencesType } from "../types/userType";
import { postType } from "../types/postType";

export class PostDto  {
 
  userId: string;
  image: string;
  likes: string[];
  comments: string[];
  constructor(userId: string, image: string) {
  
    this.userId = userId;
    this.image = image;
    this.likes = [];
    this.comments = [];
  }
}
