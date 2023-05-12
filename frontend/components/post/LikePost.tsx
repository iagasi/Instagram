import { postType } from "@/../types/postType";
import { userVar } from "@/reactive/user";
import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { gql } from "../../__generated__/gql";
import { UserAndPrefferncesType } from "@/../types/userType";

const like = gql(`
mutation LikePost ($postId:String,$personId:String) {

  likePost(input:{postId:$postId,personId:$personId}) {
  likes
  userId
  }
  }
  `);
  type props= {
    postData: postType | undefined 
   currUser:UserAndPrefferncesType|null
   
   }
export function LikePost({ postData ,currUser}:props) {
  const [likes, setLikes] = useState(postData?.likes);

  const [likePost, { data: likedData }] = useMutation(like);
  useEffect(()=>{
  if (likedData && postData) {
    const modLikes = likedData.likePost?.likes as string[];
   setLikes(modLikes)
  }
  },[postData, likedData])

  function likeHandler() {
    try {
      likePost({
        variables: { postId: postData?._id, personId: currUser?.user._id },
      });
    } catch (e) {
     
    }
  }
  return (
    <div className=" text-3xl  ">
      <div className="flex space-x-4">
        <AiOutlineHeart
          className=" cursor-pointer hover:text-gray-300 "
          onClick={likeHandler}
        />
        <TbMessageCircle2 className=" cursor-pointer  hover:text-gray-300" />
      </div>

      <div className="cursor-pointer  hover:text-gray-300  text-2xl">
        {likes?.length} likes
      </div>
    </div>
  );
}


