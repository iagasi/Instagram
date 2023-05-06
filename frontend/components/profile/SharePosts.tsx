import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import React from "react";
import { BsCamera } from "react-icons/bs";

function SharePosts(props: withModalType) {
  return <div className="flex justify-center flex-col items-center pt-10">

<BsCamera className="cursor-pointer w-12 h-12" onClick={()=>props.setModal()} />

<div className=" text-2xl">SahrePosts</div>
  </div>;
}
function SharePostsModalData() {
  return (
    <div className=" flex items-center justify-center h-full ">
     <label className=" bg-blue-500 rounded-md p-2 cursor-pointer">
        
         Upload from Pc
         <input className="hidden" type="file" />
         </label>
    </div>
  );
}

export default WithModal(SharePosts, SharePostsModalData);
