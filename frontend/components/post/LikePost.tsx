import { postType } from "@/../types/postType";
import { userVar } from "@/reactive/user";
import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { gql } from "../../__generated__/gql";
import { UserAndPrefferncesType } from "@/../types/userType";
import OpenLikes from "./OpenLikes";
import { log } from "console";
import { useGetPostById } from "@/hooks/post";

const like = gql(`
mutation LikePost ($postId:String,$personId:String) {

  likePost(input:{postId:$postId,personId:$personId}) {
  likes
  userId
  }
  }
  `);
type props = {
  postData: postType | undefined;
  currUser: UserAndPrefferncesType | null;
  refetch: any;
};
export function LikePost({ postData, currUser, refetch }: props) {
  const [likePost, { data: likedData }] = useMutation(like);
  useEffect(() => {
    refetch();
  }, [likedData, refetch]);

  function likeHandler() {
    try {
      likePost({
        variables: { postId: postData?._id, personId: currUser?.user._id },
      });
    } catch (e) {}
  }
  return (
    <div className=" text-3xl  ">
      <div className="flex space-x-4">
        {currUser?.user._id && postData?.likes?.includes(currUser?.user._id) ? (
          <AiFillHeart
            className=" cursor-pointer text-red-500  hover:text-gray-300  "
            onClick={likeHandler}
          />
        ) : (
          <AiOutlineHeart
            className=" cursor-pointer  text-gray-300  hover:text-red-500   "
            onClick={likeHandler}
          />
        )}

        <TbMessageCircle2 className=" cursor-pointer  hover:text-gray-300" />
      </div>
      <OpenLikes likes={postData?.likes} postData={postData} />
    </div>
  );
}
