import React, { useEffect, useState } from "react";
import Chats from "./Chats";
import Interaction from "./Interaction";
import { useGetChats, useGetMessages } from "@/hooks/chat";
import Loading from "../Loading";
import { useLogginedUserdata } from "@/hooks/user";
import { useReactiveVar } from "@apollo/client";
import { chatIdVar, iAmMessagingWithVar } from "./messengerState";
import { Sidebar } from "../Sidebar";
import ChatHoc from "./hoc/ChatHoc";

function Messenger() {
  const { data, loading } = useLogginedUserdata();
  const { data: chats, refetch: refetchChats } = useGetChats(data?.user?._id);
  //chatIdVar(null)
  useEffect(() => {
    refetchChats();
  }, [refetchChats]);
  if (loading) {
    return <Loading size="30" />;
  }

  return (
    <div
      className="flex h-screen pb-5
     max-[500px]:block
     max-sm:text-sm
     justify-between
    "
    >
      <Sidebar />
      <div
        className=" flex w-full  h-full    

"
      >
        {chats && (
            <ChatHoc
              MainComponent={() => (
                <Chats logginedUser={data?.user} chats={chats} />
              )}
           
            />
        )}
        <Interaction />
      </div>
    </div>
  );
}

export default Messenger;
