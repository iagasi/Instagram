import { useUnreadMessagesGet } from "@/hooks/chat";
import { useLogginedUserdata } from "@/hooks/user";
import { useRouter } from "next/router";
import React from "react";
import { BsMessenger } from "react-icons/bs";

function MessengerOpenBtn() {
  const router = useRouter();
  const { data: loggedUserData } = useLogginedUserdata();
  const unreadData = useUnreadMessagesGet(loggedUserData?.user?._id);
  return (
    <div
      className=" relative sidebar-elem"
      onClick={() => router.push("/messenger")}
    >
      <BsMessenger className=" text-blue-500" />
      <span className=" text-lg"> Messenger</span>
      {router.pathname == "/messenger" && (
        <div className="sidebar__active"></div>
      )}
      {unreadData.data?.length && (
        <div className=" absolute -top-4 left-5 bg-red-600 text-xl w-6 h-6 flex justify-center  items-center  text-white  rounded-full">
          {unreadData.data?.length}
        </div>
      )}{" "}
    </div>
  );
}

export default MessengerOpenBtn;
