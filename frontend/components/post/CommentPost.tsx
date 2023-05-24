import { combinedUserAndCommentType, postType } from "@/../types/postType";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import React, { useEffect, useRef, useState } from "react";
import { gql } from "../../__generated__/gql";
import { useMutation,} from "@apollo/client";
import { AiOutlineSend } from "react-icons/ai";

import OpenPost from "./OpenedPost";
import Loading from "../Loading";
import { postVar } from "@/reactive/post";
import { Modal } from "../Modal";
import PostComments from "./PostComments";

type props = {
  postData: postType | undefined;
  currUser: UserAndPrefferncesType | null;
  postPublisher: UserType;
  refetchPosts?: () => combinedUserAndCommentType[];
};

const addComment = gql(`
  mutation commentPost($postId:String,$personId:String,$message:String){
    commentPost(input:{_id:$postId,personId:$personId,message:$message})
  }
  `);
function CommentPost({
  postData,
  currUser,
  postPublisher,
  refetchPosts,
}: props) {
  const modaIsOpen = document.querySelector("#modal");


  const [messageText, setMessageText] = useState("");
  const [loadComments, setLoadComments] = useState(false);
  const [commetPost, { data: response }] = useMutation(addComment);

  useEffect(() => {
    if (response?.commentPost) {
      setMessageText("");

      setLoadComments(!loadComments);
      if (modaIsOpen && refetchPosts) {
        const y = refetchPosts();
      }
    }
  }, [response]);

  const commentHandler = () => {
    commetPost({
      variables: {
        postId: postData?._id,
        personId: currUser?.user._id,
        message: messageText,
      },
    });
  };

  if (!postData) {
    return <Loading size="40" />;
  }
  return (
    <div className=" pr-5">
 

      <div className="cursor-pointer">
        <PostComments postData={postData} loadCommets={loadComments} />
      </div>
      <input
        className=" mt-5  pb-5 focus:outline-0 w-full  focus:border-b-[1px]  border-blue-500 text-lg font-bold"
        placeholder="Add Comment"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />

      <button
        className="relative disabled:text-gray-300 text-blue-700 "
        onClick={commentHandler}
        disabled={!messageText}
      >
        <AiOutlineSend className={`absolute text-3xl -top-5 `} />
      </button>
    </div>
  );
}

export default CommentPost;
