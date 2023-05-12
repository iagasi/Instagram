import { commentType } from "../../../types/postType";
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
    getFriendsPosts: (parrent: UserType, args: QueryUserArgs) => {
      return postService.getFriendsPosts(args.id);
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
  },
};

export const postTypeDefs = `
  type commentType{
    _id:String
    userId:String
    message:String
    time:Int
  }
  type postType{
    _id:String
    userId:String
    image:String
    likes:[String]
    comments:[String]
}

type Query{
  getFriendsPosts(id:String):[postType]

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

}
  `;
