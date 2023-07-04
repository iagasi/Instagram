import React, { useEffect } from "react";
import { TbMessageCircle2 } from "react-icons/tb";
import { UserType } from "../../../types/userType";
import { useCreateChat } from "../messenger/hooks";
import { useRouter } from "next/router";
import { useGetChats } from "@/hooks/chat";
import { useLogginedUserdata } from "@/hooks/user";
import { chatIdVar, iAmMessagingWithVar } from "../messenger/messengerState";

function CreateChat({
  postCreator,
  children,
}: {
  postCreator: UserType;
  children: React.ReactNode;
}) {
  const { data: loggineUserData } = useLogginedUserdata();
  const { createChat, data } = useCreateChat(postCreator?._id);
  const { data: chats, refetch: refetchChats } = useGetChats(
    loggineUserData.user._id
  );

  const router = useRouter();

  function chatHandler() {
    const chatExist = chats?.find((chat) =>
      chat.chat.users.includes(postCreator._id)
    );
    console.log(chatExist);

    if (!chatExist) {
      createChat();
      refetchChats();
    }
    router.push("/messenger");
  //  iAmMessagingWithVar(postCreator);
    if (chatExist?.chat._id) {
    }
    chatIdVar(chatExist?.chat._id);
  }

  return (
    <div className=" cursor-pointer  hover:text-gray-300" onClick={chatHandler}>
      {children}
    </div>
  );
}

export default CreateChat;
