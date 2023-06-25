import React, { useEffect } from "react";
import { TbMessageCircle2 } from "react-icons/tb";
import { UserType } from "../../../types/userType";
import { useCreateChat } from "../messenger/hooks";
import { useRouter } from "next/router";
import { useGetChats } from "@/hooks/chat";
import { useLogginedUserdata } from "@/hooks/user";

function CreateChat({ postCreatorId }: { postCreatorId: string }) {
  const { data: loggineUserData } = useLogginedUserdata();
  const { createChat, data } = useCreateChat(postCreatorId);
  const { data: chats, refetch: refetchChats } = useGetChats(
    loggineUserData.user._id
  );

  const router = useRouter();

  function chatHandler() {
    const chatExist = chats?.find((chat) =>
      chat.chat.users.includes(postCreatorId)
    );
    console.log(chatExist);

    if (!chatExist) {
      createChat();
    }
    router.push("/messenger");
  }
  console.log(data);

  return (
    <TbMessageCircle2
      className=" cursor-pointer  hover:text-gray-300"
      onClick={chatHandler}
    />
  );
}

export default CreateChat;
