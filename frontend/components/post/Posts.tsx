import { useQuery, gql, useReactiveVar } from "@apollo/client";
import { postType } from "@/../types/postType";
import React, { useEffect } from "react";
import { Post } from "./Post";
import { LStorage } from "@/helpers/user";
const query = gql`
  query ($id: String) {
    getFriendsPosts(id: $id) {
      _id
    
    }
  }
`;
function Posts() {
  const { data,refetch } = useQuery(query, {
    variables: { id: LStorage.getUser()?._id },
  });
useEffect(()=>{refetch()},[refetch])
  const posts: postType[] = data?.getFriendsPosts;

  return (
    <div>
      {posts?.map((post) => {
        return <Post key={post._id} postId={post._id} />;
      })}
    </div>
  );
}

export default Posts;
