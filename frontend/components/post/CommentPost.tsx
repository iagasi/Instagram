import { combinedUserAndCommentType, postType } from "@/../types/postType";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import React, { useEffect, useState } from "react";
import { gql } from "../../__generated__/gql";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { AiOutlineSend } from "react-icons/ai";

import OpenPost from "./OpenedPost";
import Loading from "../Loading";
import { postVar } from "@/reactive/post";

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
  const POSTSVAR = useReactiveVar(postVar);

  const currPost = POSTSVAR.find((post) => post._id === postData?._id);

  const [messageText, setMessageText] = useState("");

  const [commetPost, { data: response }] = useMutation(addComment);

  useEffect(() => {
    if (response?.commentPost) {
      setMessageText("");
      if (POSTSVAR.length) {
        const newPosts: postType[] = JSON.parse(JSON.stringify(POSTSVAR));
        const modcurrPost= newPosts.find((post) => post._id === postData?._id);
        modcurrPost?.comments.push(response?.commentPost);
        postVar(newPosts)
      }

      if (modaIsOpen && refetchPosts) {
        refetchPosts();
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
      <section id="OpensPost">
        {!modaIsOpen ? (
          <OpenPost
            postData={postData}
            postPublisher={postPublisher}
            currUser={currUser}
            Content={() => (
              <div className=" cursor-pointer  hover:text-gray-300">
                See all {currPost?.comments?.length} comments
              </div>
            )}
          />
        ) : (
          <div className=" cursor-pointer  hover:text-gray-300">
            {currPost?.comments?.length} comments
          </div>
        )}
      </section>
      <input
        className=" focus:outline-0 w-full text-lg font-bold"
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
