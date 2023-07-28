import { log } from "console";
import { commentType, postType } from "../../../types/postType";
import { UserType } from "../../../types/userType";
import { postService } from "../services/postsService";

interface QueryUserArgs {
  id: string;
}

interface ILikePostInput {
  input: {
    postId: string;
    personId: string;
  };
}
interface ICommentPostInput {
  input: commentType;
}
export const postResolvers = {
  Query: {
    getInterestingPosts:async(parrent: UserType, args: QueryUserArgs)=>{
  
      
return await postService.interestingPosts(args.id)
    },
    getFriendsPosts: async (parrent: UserType, args: QueryUserArgs) => {
      return  await postService.getFriendsPosts(args.id);
    },
    getPostCommentsAndAuthors: async (
      parrent: UserType,
      args: { postId: string }
    ) => {
      return await postService.getPostCommentsAndAuthors(args.postId);
    },
    getPostById: async (
      parrent: UserType,
      args: { postId: string }
    ) => {
      return await postService.getPostById(args.postId);
    },

    getPostLikedPersons: async (
      parrent: UserType,
      args: { postId: string }
    ) => {
      return await postService.getPostLikedPersons(args.postId);
    },
  },
  Mutation: {
    likePost: (paretn: any, args: ILikePostInput) => {
    
      
      return postService.likePost(args.input.postId, args.input.personId);
    },

    commentPost: (paretn: any, args: ICommentPostInput) => {
      return postService.commentPost(
        args.input._id,
        args.input.personId,
        args.input.message
      );
    },

    deletePost: (paretn: any, args: ILikePostInput) => {
     
      
      return postService.deletePost( args.input.personId,args.input.postId)
    },
  },
};

export const postTypeDefs = `

type UserType{
  _id:String
   name: String
   surname: String
   image:String
 }
  type commentType{
    _id: String,
    postId: String,
    personId: String,
    message: String,
    time: String,
  }
  type postType{
    _id:String
    userId:String
    image:String
    likes:[String]
    comments:[String]
}

type UserCommetType{
  commentMaker:UserType,
  comment:commentType
}

type Query{
  getFriendsPosts(id:String):[postType]
  getPostCommentsAndAuthors(postId:String):[UserCommetType]
  getPostById(postId:String):postType
  getPostLikedPersons(postId:String):[UserType]
  getInterestingPosts(id:String):[postType]
}
  
input likePostInput{
  postId:String
  personId:String
}
input commentPostInput{
 _id:String
 postId:String
  personId:String
  message:String
}
type Mutation{
  likePost(input:likePostInput):postType
  commentPost(input:commentPostInput):String
deletePost(input:likePostInput):String
}
  `;
