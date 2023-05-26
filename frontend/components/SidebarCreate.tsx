import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import SharePosts, { SharePostsModalData } from "./profile/SharePosts";
import { AiOutlineFileImage } from "react-icons/ai";

type propsType = withModalType;

function SidebarCreate(props: propsType) {
  return (
    <div className="sidebar-elem " onClick={() => props.setModal()}>
      <AiOutlinePlusCircle />

      <span className=" text-lg">Create</span>
    </div>
  );
}

function SidebarCreateHandler(props: propsType) {
  return (
    <div className=" w-[600px] flex  flex-col items-center  text-xl pb-10">
      <div className=" border-b-2 pb-2 w-full text-center ">Create Post</div>
      <div className="pt-10">
        <AiOutlineFileImage className="  w-[100px] h-[100px]" />
      </div>
      <SharePostsModalData modal={props.modal} setModal={props.setModal} />
    </div>
  );
}

export default WithModal(SidebarCreate, SidebarCreateHandler);
