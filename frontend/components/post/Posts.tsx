import { useQuery, gql, useReactiveVar } from "@apollo/client";
import { postType } from "@/../types/postType";
import React, { useEffect } from "react";
import { Post } from "./Post";
import { LStorage } from "@/helpers/user";
import { useGetFriendsPosts } from "@/hooks/post";
import { useLogginedUserdata } from "@/hooks/user";

function Posts() {
const{posts,refetch}=useGetFriendsPosts()
const {data:loggedUser}=useLogginedUserdata()
useEffect(()=>{refetch()},[refetch])
 
if(!loggedUser?.prefferences.followings.length){
  return <div className="  pt-20 text-3xl text-gray-400">
    Go to Search  find people and Add to friends to see their activity 
  </div>
}

  return (

    <div>
      
      {posts?.map((post) => {
        return <Post key={post._id} postId={post._id} post={post}/>;
      })}
    </div>
  );
}

export default Posts;
