import React, { useEffect, useRef, useState } from "react";
import UserPreview from "../UserPreview";
import { useLogginedUserdata } from "@/hooks/user";
import { IoMdCall } from "react-icons/io";
import { BsFillCameraVideoFill } from "react-icons/bs";
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import { chatIdVar, iAmMessagingWithVar, showEmojiVar } from "./messengerState";
import { messageType } from "@/../types/chatType";
import { useReactiveVar } from "@apollo/client";
import { useGetChats } from "@/hooks/chat";
import VideoCall from "./VideoCall";

function Interaction() {
    const chatId=useReactiveVar(chatIdVar)
const scrollRef=useRef(null)


useEffect(() => {
  console.log(666666);
  
  
},[chatId]);
    const {data,loading} = useLogginedUserdata()
    const {data:chats}=useGetChats(data?.user?._id)
     const communicateWith=chats?.find(i=>i.chat._id===chatId)?.chatWithInfo

  return (
    <div className="  flex flex-col flex-1 pr-10 pb-10 h-screen  justify-between bg-red ">
      <div
        className="  flex  justify-between  border-b-2   "
        onClick={() => showEmojiVar(false)}
      >
        <div> {
          chatId&&          <UserPreview user={communicateWith} />

        }
        </div>
        <div className=" flex self-center space-x-8  text-3xl">
     
      <VideoCall/>
    
        </div>
      </div>
      <div ref={scrollRef} className=" flex-1 bg-slate-100 overflow-y-scroll" onClick={() => showEmojiVar(false)}>
        <MessagesList />
      </div>

      <MessageInput  scrollElem={scrollRef}/>
    </div>
  );
}

export default Interaction;
