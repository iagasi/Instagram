import { log } from "console";
import {
  combinedUserAndCommentType,
  commentType,
  postType,
} from "../../../types/postType";
import { PostError } from "../errors";
import {
  comments,
  dbComments,
  dbCommentsById,
  getUserById,
  posts,
  userPrefferences,
  users,
} from "./db";
import { CommentDto } from "../../../dto/commentDto";
import { UserType } from "../../../types/userType";
import { UserService } from "./userService";

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
  static getPostById(postId: string) {
    if (!postId) {
      throw new PostError("Id s Not provided");
    }

    const targetPost = posts.find((p) => p._id == postId);

    if (!targetPost) {
      throw new PostError("Post Not Found with this id");
    }
    return targetPost;
  }

  static async likePost(postId: string, personId: string) {
    const targetPost = this.getPostById(postId);
    if (targetPost.userId === personId) {
      throw new PostError("You cannot like yout own Post");
    }
    if (targetPost.likes.includes(personId)) {
      const index = targetPost.likes.indexOf(personId);
      targetPost.likes.splice(index, 1);
    } else {
      targetPost.likes.push(personId);
    }

    return targetPost;
  }

  static commentPost(postId: string, personId: string, message: string) {
    const targetPost = this.getPostById(postId);

    if (!targetPost) {
      return;
    }

    const createComment = comments.push({
      _id: Math.floor(Math.random() * 100).toString(),
      personId,
      message,
      postId,
      time: Date.now().toString(),
    });

    targetPost.comments.push(comments[createComment - 1]._id);
    console.log(targetPost);

    return comments[createComment - 1]._id;
  }

  static async getPostCommentsAndAuthors(postId: string) {
    const post = this.getPostById(postId);
    const commentsArray: combinedUserAndCommentType[] = [];

    for await (const commetId of post.comments) {
      const comment = await dbCommentsById(commetId);
      if (!comment) {
        throw new Error("comment not found");
      }
      const user = await getUserById(comment.personId);
      if (!user) {
        throw new Error("user not found");
      }

      const commentAndItMaker: combinedUserAndCommentType = {
        commentMaker: user,
        comment: comment,
      };
      commentsArray.push(commentAndItMaker);
    }
    return commentsArray;
  }

  static async getPostLikedPersons(postId: string):Promise<UserType[]>{
    const post = this.getPostById(postId);
    
    const users: UserType[] = [];
    for await (const userId of post.likes) {
      const user = await UserService.getSingleUser(userId);
      if (user) {
        users.push(user);
      }
    }
    return users;
  }
}
