import { messageType } from "@/../types/chatType";
import {
  listenChatMessagesGql,
  useGetChats,
  useGetMessages,
  useSubscriptionChatMessage,
} from "@/hooks/chat";
import { useLogginedUserdata } from "@/hooks/user";
import React, { useEffect, useState } from "react";
import UserPreview from "../UserPreview";
import { useReactiveVar, useSubscription } from "@apollo/client";
import { chatIdVar, iAmMessagingWithVar } from "./messengerState";
import { timeAgo } from "@/common";




function MessagesList() {
  const chatId = useReactiveVar(chatIdVar) as string;
  const IAmMessagingWith = useReactiveVar(iAmMessagingWithVar);
  
const [messages,setMessages]=useState<messageType[]|[]>([])
  const {
    data: LoadedMessages,
    subscribeToMore,
    refetch: refetchMessagtes,
  } = useGetMessages(chatId);
  const { data :newMessage} = useSubscriptionChatMessage(chatId);
useEffect(()=>{
  if(LoadedMessages){
    setMessages(LoadedMessages)
  }
},[LoadedMessages])
  useEffect(()=>{
  
if(newMessage){
  setMessages((prev)=>[...prev,newMessage])
}
  },[LoadedMessages,newMessage])


  useEffect(() => {
    refetchMessagtes();
  }, [chatId]);
  function subscribeToMoreMessages() {
    subscribeToMore({
      document: listenChatMessagesGql,
      variables: { input: { chatId: chatId } },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data as {
          receiveMessage: messageType;
        };

        const oldMessages = prev.getMessages as messageType[];

        return Object.assign({}, prev, {
          getMessages: [...oldMessages, newMessage.receiveMessage],
        });
      },
    });
  }

  if (!chatId) {
    return (
      <div className=" text-4xl pt-5  text-gray-400 text-center max-md:text-lg max-[550px]:hidden">
        <p>Realtime </p>
        <p className=" text-gray-500">Video and Messaging </p>
   
       Application
        <p>Like Messenger</p>
        <small>
          Search friend in search Bar (left side)and create chat to communicate !
        </small>
        <div className=" text-xl text-stone-800 0 flex justify-center pt-5"></div>
      </div>
    );
  }
  if (!messages?.length) {
    return (
      <div className=" text-4xl  text-gray-300 text-center">
        <p>Start</p>
        Communucation
        <p>With</p>
        <div className=" text-xl text-stone-800 0 flex justify-center pt-5">
          <UserPreview user={IAmMessagingWith} />
        </div>
      </div>
    );
  }
  return (
    <div className=" space-y-10 h-full p-2  
    
   "
    >
      {messages.length &&
        messages.map((m) => (
            <Message message={m} key={m._id} />
        ))}
    </div>
  );
}

function Message({ message }: { message: messageType }) {
  const { data: loggedUserInfo } = useLogginedUserdata();
  const IAmMessagingWith = useReactiveVar(iAmMessagingWithVar);

  const isMyMessage = message.userId === loggedUserInfo?.user._id;
  const sender = isMyMessage ? loggedUserInfo?.user : IAmMessagingWith;
console.log((Number(message.timeStamp)));

  const style =
    sender?._id == loggedUserInfo?.user._id
      ? ` ml-auto  bg-blue-300`
      : " bg-gray-300";
  return (
    <div className={" relative rounded-lg w-fit  max-w-[200px] " + style}>
      {/* <div className=" relative h-20 w-[200px]"> */}

              <div className=" w-fit text-sm  pr-2">      <UserPreview user={sender} /></div>

      {/* </div> */}

      <div className=" break-words overflow-hidden ">{message.message}</div>
      <div className=" absolute -bottom-5 right-0 font-bold text-slate-400 ">
        {timeAgo.format(new Date(Number(message.timeStamp)))}
      </div>
    </div>
  );
}
export default MessagesList;
