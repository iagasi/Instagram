import { $gePostByIdGql } from "@/gql/post";
import { useQuery } from "@apollo/client";

export  function useGetPostById(postId:string|undefined){
const {data,refetch}=useQuery($gePostByIdGql,{variables:{postId},skip:!postId})
const res=data?.getPostById 

return {data:res,refetch}
}