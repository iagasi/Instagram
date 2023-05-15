import Image from "next/image";
import React, { useEffect, useState } from "react";

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
import { WithModal } from "@/Hoc/WithModal";
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
  const { data, refetch } = useQuery(query, {
    variables: { id: cardData?.userId.toString() },
  });

const postPublisher=data?.findUser as UserType
  return (
    <div className=" border-b-2  pb-4 w-fit   ">
      <h1>{cardData?._id}</h1>
      <div className=" flex justify-between ">
        <UserPreview user={postPublisher} />
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
      <div className=" space-y-1">
        <CommentPost postData={cardData} currUser={currUser} postPublisher={postPublisher} />
      </div>
    </div>
  );
}
