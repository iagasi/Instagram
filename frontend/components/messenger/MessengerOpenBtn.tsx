import {
  subscribeUnreadMessages,
  useSubscribeUnreadMessages,
  useUnreadMessagesGet,
} from "@/hooks/chat";
import { useLogginedUserdata } from "@/hooks/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsMessenger } from "react-icons/bs";
import { socket } from "./socket";
import { callerVar, mySocketIdVar,} from "./messengerState";
import { useReactiveVar } from "@apollo/client";
import UserPreview from "../UserPreview";
import AnswerCall from "./AnswerCall";
let myId=""
function MessengerOpenBtn() {
const mySocketId=useReactiveVar(mySocketIdVar)
  const { data: loggedUserData } = useLogginedUserdata();
 

  useEffect(() => {
    socket.emit("setUser", loggedUserData.user);
    socket.on("setUserId", (id) => {
      mySocketIdVar(id);
    })
    
  },
 
  
  []);
  const router = useRouter();
  const {
    data: unreadData,
    subscribeToMore,
    refetch,
  } = useUnreadMessagesGet(loggedUserData?.user?._id);
  const { data } = useSubscribeUnreadMessages(loggedUserData.user._id);
  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <div
  
      className=" relative sidebar-elem  flex  justify-center  
      max-[850px]:gap-0
      "
      onClick={() => router.push("/messenger")}
    >
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
