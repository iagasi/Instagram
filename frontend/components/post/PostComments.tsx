import { postType } from "@/../types/postType";
import { postVar } from "@/reactive/post";
import { useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";

import { gql } from "../../__generated__/gql";

const GetCommentPost = gql(`
query GetCommentPost($postId:String){
  getPostCommentsAndAuthors(postId:$postId) {
commentMaker {
  name
  image
}
 comment {
   message
   time
   
 }
    
  }
}`);
type props = {
  loadCommets: boolean;
  postData: postType;
};
function PostComments(props: props) {
  useEffect(() => {
    refetch();
  }, [props.loadCommets]);
  const { data, refetch } = useQuery(GetCommentPost, {
    variables: { postId: props.postData?._id },
    skip: !props.postData?._id,
    pollInterval: 10000,
  });

  return <div  className="hover:text-slate-500">See all Comments  <strong>( {data?.getPostCommentsAndAuthors?.length} )</strong></div>;
}

export default PostComments;
