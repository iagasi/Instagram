import { log } from "console";
import {
  combinedUserAndCommentType,
  commentType,
  postType,
} from "../../../types/postType";
import { PostError } from "../errors";
import { PostDto} from "../../../dto/postDto";


import { UserType } from "../../../types/userType";
import { UserService } from "./userService";
import { PrefferenceDb } from "../db/schemas/Prefferences";
import { PostsDb } from "../db/schemas/Post";
import { CommentsDb } from "../db/schemas/Comments";
import { UserDb } from "../db/schemas/User";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { cloudinaryService } from "./clousdinaryService";

export class postService {
  static async getFriendsPosts(userId: string) {
    const preffer = await PrefferenceDb.findOne({ userId });
    if (!preffer) {
      return [];
    }

    const posts = [];
    for (const userId of preffer?.followings) {
      const pref = await PrefferenceDb.findOne({ userId: userId });
      if (pref) {
        posts.push(...pref?.posts);
      }
    }

    return posts;
  }
  static async getPostById(postId: string) {
    if (!postId) {
      throw new PostError("Id s Not provided");
    }

    const targetPost = await PostsDb.findById(postId);
    if (!targetPost) {
      throw new PostError("Post Not Found with this id");
    }
    return targetPost;
  }

  static async likePost(postId: string, personId: string) {
    console.log("here");

    const foundUserPreffetences = await UserService.userPrefferences(personId);
    const targetPost = await PostsDb.findById(postId);
    if (!targetPost) {
      return;
    }
    // console.log(typeof postId);

    // if (targetPost.userId == personId) {
    //   throw new PostError("You cannot like yout own Post");
    // }
    if (targetPost.likes.includes(personId.toString())) {
      targetPost.likes = targetPost.likes.filter(
        (e) => e !== personId.toString()
      );
    } else {
      targetPost.likes.push(personId.toString());
    }
    if (foundUserPreffetences?.saved.includes(postId)) {
      const index = foundUserPreffetences.saved.indexOf(postId);
      foundUserPreffetences.saved.splice(index, 1);
    } else {
      foundUserPreffetences?.saved.push(postId);
    }

    try {
      await targetPost?.save();
      await foundUserPreffetences?.save();
    } catch (e) {
      console.log(e);
    }
    return targetPost;
  }

  static async commentPost(postId: string, personId: string, message: string) {
    const targetPost = await this.getPostById(postId);

    if (!targetPost) {
      return;
    }

    const createComment = await new CommentsDb({
      personId,
      message,
      postId,
      time: Date.now().toString(),
    }).save();

    targetPost.comments.push(createComment._id);
    await targetPost.save();
    return createComment._id;
  }

  static async getPostCommentsAndAuthors(postId: string) {
    const post = await this.getPostById(postId);
    const commentsArray: combinedUserAndCommentType[] = [];

    for await (const commetId of post.comments) {
      const comment = (await CommentsDb.findById(commetId)) as commentType;
      if (!comment) {
        throw new Error("comment not found");
      }
      const user = (await UserDb.findById(comment.personId)) as UserType;
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

  static async getPostLikedPersons(postId: string) {
    const post = await this.getPostById(postId);

    const users = [];
    for await (const userId of post.likes) {
      const user = await UserService.getSingleUser(userId);
      if (user) {
        users.push(user);
      }
    }
    return users;
  }

  static async uploadPostImage(
    userId: string,
    file: Express.Multer.File | undefined
  ) {
    const userPrefferences = await UserService.userPrefferences(userId);
    if (!userPrefferences) {
      return;
    }
    if (!file) {
      return;
    }
    try {
      const filename =  await cloudinaryService.uploadFile(userId, "images", file);
      if (filename) {
        const post = new PostDto(userId, filename);
        const newPost = await new PostsDb({ ...post }).save();

        userPrefferences.posts.push(newPost._id);
        await userPrefferences.save();
        console.log(newPost);
        
        return "uploaded";
     }
    } catch (e) {
      console.log(e);
    }
  }

  static async deletePost(userId: string, postId: string) {
    try {
      const post = await postService.getPostById(postId);
      const userPrefferences = await UserService.userPrefferences(
        userId.toString()
      );
      if (userPrefferences) {
        cloudinaryService.removeFile(post.image);

        const filteredPrefferences = userPrefferences?.posts.filter(
          (id) => id.toString() !== postId
        );
        userPrefferences.posts = filteredPrefferences;
        await userPrefferences.save();
        await PostsDb.deleteOne({ _id: postId });
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async interestingPosts(id: string) {
  const interesting=  await PostsDb.find({likes:{$gt:1}})
    console.log(interesting);
    return interesting
    
  }
}
