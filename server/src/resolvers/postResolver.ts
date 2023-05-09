import { UserType } from "../../../types/userType";
import { postService } from "../services/postsService";

interface QueryUserArgs {
  id: string;
}
export const postResolvers = {
  Query: {
    getFriendsPosts: (parrent: UserType, args: QueryUserArgs) => {
      return postService.getFriendsPosts(args.id);
    },
  },
};

export const postTypeDefs = `
  
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
  
  `;
