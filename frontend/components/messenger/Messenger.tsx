import React, { useEffect, useState } from "react";
import Chats from "./Chats";
import Interaction from "./Interaction";
import { useGetChats, useGetMessages } from "@/hooks/chat";
import Loading from "../Loading";
import { useLogginedUserdata } from "@/hooks/user";
import { useReactiveVar } from "@apollo/client";
import { chatIdVar, iAmMessagingWithVar } from "./messengerState";
import { Sidebar } from "../Sidebar";

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
    <div className="flex h-screen pb-7">
      <Sidebar />
      {chats && <Chats logginedUser={data.user} chats={chats} />}
      <Interaction />
    </div>
  );
}

export default Messenger;
