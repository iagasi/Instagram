import { postType } from "../../../types/postType";
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
}
