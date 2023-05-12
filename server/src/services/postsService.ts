import { log } from "console";
import { postType } from "../../../types/postType";
import { PostError } from "../errors";
import { posts, userPrefferences, users } from "./db";

export class postService {
  static getFriendsPosts(userId: string) {
    const preffer = userPrefferences.find((pref) => pref.userId == userId);
    if (!preffer) {
      return [];
    }
    const postsArr = posts.filter((post) =>
      preffer.followings.includes(post.userId)
    );

    return postsArr;
  }
  static getUserPost() {}

  static async likePost(postId: string, personId: string) {
    if (!postId || !personId) {
      throw new PostError("Id s Not provided");
    }
 
    const targetPost = posts.find((p) => p._id == postId);

    if (!targetPost) {
      throw new PostError("Post Not Found with this id");
    }
    if (targetPost.userId===personId) {
      throw new PostError("You cannot like yout own Post");
    }
    if (targetPost.likes.includes(personId)) {
      const index = targetPost.likes.indexOf(personId);
      targetPost.likes.splice(index,1)
    } else {
      targetPost.likes.push(personId);
    }
    console.log(targetPost.likes);
    
    return targetPost;
  }
}
