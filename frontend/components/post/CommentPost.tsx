import { postType } from "@/../types/postType";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import React, { useEffect, useState } from "react";
import { gql } from "../../__generated__/gql";
import { useMutation } from "@apollo/client";
import { AiOutlineSend } from "react-icons/ai";

type props = {
  postData: postType | undefined;
  currUser: UserAndPrefferncesType | null;
};
const Comment = gql(`
  mutation commentPost($postId:String,$personId:String,$message:String){
    commentPost(input:{_id:$postId,personId:$personId,message:$message})
  }
  `);
function CommentPost({ postData, currUser }: props) {
  const [comments, setComments] = useState<string[]|[]>(postData?.comments||[]);
  const [text, setText] = useState("");

  const [commetPost, { data:response }] = useMutation(Comment);
  useEffect(()=>{
    const resPostId=response?.commentPost as string
if(response?.commentPost&&comments){
  setComments(prev=>[...prev,resPostId])
   setText("")
}
  },[response])
  const commentHandler = () => {
    commetPost({variables:{
      postId:postData?._id,
      personId:currUser?.user._id,
      message:text
      
      
    }})
   

  };
  return (
    <div className=" pr-5">
      <p className=" cursor-pointer  hover:text-gray-300">
        See all <strong> {comments?.length}</strong> comments
      </p>
      <input
        className=" focus:outline-0 w-full text-lg font-bold"
        placeholder="Add Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button className="relative" onClick={commentHandler}>
          <AiOutlineSend
            className=" absolute text-blue-700 text-3xl -top-5 "
          />
        </button>
      )}
    </div>
  );
}

export default CommentPost;
