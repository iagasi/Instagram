import { UserType } from "../../../types/userType";
import { postService } from "../services/postsService";

interface QueryUserArgs {
  id: string;
}

interface ILikePostInput {
  input:{

      postId:string
  personId:string
  }

}

export const postResolvers = {
  Query: {
    getFriendsPosts: (parrent: UserType, args: QueryUserArgs) => {
      return postService.getFriendsPosts(args.id);
    },
 
  },
  Mutation:{
    likePost:(paretn:any,args:ILikePostInput)=>{
      console.log("xxxxxxx");
      
      return postService.likePost(args.input.postId,args.input.personId,)
    }
  
    
  }
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
  
input likePostInput{
  postId:String
  personId:String
}

type Mutation{
  likePost(input:likePostInput):postType
}
  `;
