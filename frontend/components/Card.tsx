import Image from "next/image";
import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import UserPreview from "./UserPreview";

export function Card() {
  return (
    <div className=" border-b-2  pb-4 w-fit">
      <div className=" flex justify-between">
      <UserPreview/>
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
        <p className=" font-bold">31 likes</p>
        <p className="">View all 4 comments</p>

        <input className="focus:outline-0" placeholder="Add Comment" />
      </div>
    </div>
  );
}
