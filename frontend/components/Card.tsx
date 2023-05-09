import Image from "next/image";
import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import UserPreview from "./UserPreview";
import { UserType } from "@/../types/userType";
import { postType } from "@/../types/postType";
import { useQuery, useReactiveVar,gql } from "@apollo/client";
import { userVar } from "@/reactive/user";
const query = gql`
query($id:String){
  findUser(id:$id) {
       _id
    name
    surname
    image
 
    
  }
}
`;

export function Card({cardData}:{cardData:postType|undefined}) {

  
  const {data}=useQuery(query,{variables: { id: cardData?.userId.toString() }}) as {data:{findUser:UserType|undefined}}

  return (
    <div className=" border-b-2  pb-4 w-fit ">
      <div className=" flex justify-between">
      <UserPreview user={data?.findUser}/>
        <BsThreeDots className=" text-3xl cursor-pointer" />
      </div>
      <Image
        className=" w-[468px] h-[526px]"
        src={"/test.jpg"}
        alt="Card Image"
        width={468}
        height={526}
      />
      <div className=" text-3xl flex space-x-5 pt-2">
        <AiOutlineHeart className=" cursor-pointer " />
        <TbMessageCircle2 className=" cursor-pointer " />
      </div>
      <div className=" space-y-">
        <p className=" font-bold">{cardData?.likes.length} likes</p>
        <p className="">View all {cardData?.comments.length}comments</p>

        <input className="focus:outline-0" placeholder="Add Comment" />
      </div>
    </div>
  );
}
