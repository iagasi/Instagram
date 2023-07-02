import { $gePostByIdGql } from "@/gql/post";
import { LStorage } from "@/helpers/user";
import { gql, useQuery } from "@apollo/client";
import { postType } from "../../types/postType";

export  function useGetPostById(postId:string|undefined){
const {data,refetch}=useQuery($gePostByIdGql,{variables:{postId},skip:!postId})
const res=data?.getPostById 

return {data:res,refetch}
}
const query = gql`
  query ($id: String) {
    getFriendsPosts(id: $id) {
      _id
    
    }
  }
`;
export function useGetFriendsPosts(){
    const { data,refetch } = useQuery(query, {
    variables: { id: LStorage.getUser()?._id },
  });
  const posts: postType[] = data?.getFriendsPosts;
  return{posts, refetch}
}
