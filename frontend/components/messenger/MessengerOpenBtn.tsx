import {
  useSubscribeUnreadMessages,
  useUnreadMessagesGet,
} from "@/hooks/chat";
import { useLogginedUserdata } from "@/hooks/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsMessenger } from "react-icons/bs";

import AnswerCall from "./AnswerCall";
import WatchUserOnline from "./WatchUserOnline";

function MessengerOpenBtn() {
  const { data: loggedUserData } = useLogginedUserdata();
  
  const router = useRouter();
  const {
    data: unreadData,
    subscribeToMore,
    refetch,
  } = useUnreadMessagesGet(loggedUserData?.user?._id);
  const { data } = useSubscribeUnreadMessages(loggedUserData?.user?._id);
  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div
  
      className=" relative sidebar-elem  flex  justify-center  
      max-lg:gap-0
      "
      onClick={() => router.push("/messenger")}
    >
      <WatchUserOnline/>
      <BsMessenger className=" text-blue-500 "  size={35}/>
      <span className=" text-lg sidebar-descr-hide"> Messenger</span>
      {router.pathname == "/messenger" && (
        <div className="sidebar__active"></div>
      )}
      {unreadData?.length!==0 && (
        <div className=" absolute -top-4 left-5 bg-red-600 text-xl w-6 h-6 flex justify-center  items-center  text-white  rounded-full">
          {unreadData?.length}
        </div>
      )}

  <AnswerCall />
    </div>
  );
}

export default MessengerOpenBtn;
