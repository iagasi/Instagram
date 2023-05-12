import Image from "next/image";
import React, { useState } from "react";

import { BsThreeDots } from "react-icons/bs";

import UserPreview from "../UserPreview";
import { UserType } from "@/../types/userType";
import { postType } from "@/../types/postType";
import {
  useQuery,
  useReactiveVar,
  useMutation,
  DocumentNode,
} from "@apollo/client";

import { gql } from "../../__generated__/gql";
import { userVar } from "@/reactive/user";
import { log } from "console";
import { LikePost } from "./LikePost";
import CommentPost from "./CommentPost";
const query = gql(`
query findUser($id:String){
  findUser(id:$id) {
       _id
    name
    surname
    image
 
    
  }
}
`);

export function Post({ cardData }: { cardData: postType | undefined }) {
  const currUser = useReactiveVar(userVar);
  const { data } = useQuery(query, {
    variables: { id: cardData?.userId.toString() },
  });

  return (
    <div className=" border-b-2  pb-4 w-fit ">
      <div className=" flex justify-between">
        <UserPreview user={data?.findUser} />
        <BsThreeDots className=" text-3xl cursor-pointer" />
      </div>
      <Image
        className=" w-[468px] h-[526px]"
        src={"/test.jpg"}
        alt="Card Image"
        width={468}
        height={526}
      />
      <LikePost postData={cardData} currUser={currUser} />
      <div className=" space-y-">
        <CommentPost postData={cardData} currUser={currUser} />
      </div>
    </div>
  );
}
