import { UserType } from "@/../types/userType";
import React, { useEffect } from "react";
import UserPreview from "../UserPreview";
import { BiMessageAdd } from "react-icons/bi";
import { gql, useMutation } from "@apollo/client";
import { Mutation, Query } from "@/__generated__/graphql";
import { useLogginedUserdata } from "@/hooks/user";
import { useGetChats } from "@/hooks/chat";
import { useCreateChat } from "./hooks";
import { AiOutlineUserAdd } from "react-icons/ai";
import Loading from "../Loading";

function CreateChat(props: { user: UserType }) {
  const { createChat, data, loading } = useCreateChat(props.user._id);
  const { data: loggineUserData } = useLogginedUserdata();
  const { data: chats, refetch: refetchChats } = useGetChats(
    loggineUserData.user._id
  );
  const chatExist = chats.find(
    (chat) => chat.chatWithInfo?._id == props.user._id
  );

  useEffect(() => {
    refetchChats();
  }, [data?.createChat, refetchChats]);

  function createChatHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    createChat();
  }

  if (props.user._id === loggineUserData?.user?._id) {
    return <></>;
  }
  console.log(loading);

  if (chatExist) {
    return (
      <div className=" flex justify-between items-center  pr-2  z-50">
        <UserPreview user={props.user} dissabled={false} />

        <p className=" font-bold text-blue-500">Chat exists</p>
      </div>
    );
  }

  return (
    <button
      className=" hover:text-blue-400  w-full  z-50"
      onClick={(e) => createChatHandler(e)}
      disabled={!!chatExist}
    >
      <div className="flex items-center justify-between ">
        <UserPreview user={props.user} dissabled={true} />
        {!loading ? (
          <div className="flex flex-col items-center">
            <AiOutlineUserAdd className=" text-3xl" />
            <small>Create chat</small>
          </div>
        ) : (
          <Loading  size="40"/>
        )}
      </div>
    </button>
  );
}

export default CreateChat;
