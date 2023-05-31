import { UserType } from "@/../types/userType";
import React, { useEffect } from "react";
import UserPreview from "../UserPreview";
import { BiMessageAdd } from "react-icons/bi";
import { gql, useMutation } from "@apollo/client";
import { Mutation, Query } from "@/__generated__/graphql";
import { useLogginedUserdata } from "@/hooks/user";
import { useGetChats } from "@/hooks/chat";

const createChat = gql(`
mutation createChat($input: CreateChatInput) {
    createChat(input: $input) {
    _id
   users
    }
  }`);


function CreateChat(props: { user: UserType }) {
  const [mutateFunction, { data }] = useMutation<Mutation>(createChat);

  const { data: loggineUserData, loading } = useLogginedUserdata();
  const { data: chats, refetch: refetchChats } = useGetChats(
    loggineUserData.user._id
  );
  const chatExist = chats.find(
    (chat) => chat.chatWithInfo?._id == props.user._id
  );

  useEffect(() => {
    refetchChats();
  }, [data?.createChat, refetchChats]);

  function createChatHandler() {
    mutateFunction({
      variables: {
        input: {
          user1Id: loggineUserData.user._id,
          user2Id: props.user._id,
        },
      },
    });
  }

  if (props.user._id === loggineUserData?.user?._id) {
    return <></>;
  }
  if (chatExist) {
    return (
      <div className=" flex justify-between items-center ">
        <UserPreview user={props.user} dissabled={false} />
        <p className=" font-bold text-blue-600">Chat exists</p>
      </div>
    );
  }

  return (
    <button
      className=" hover:text-blue-500"
      onClick={(e) => createChatHandler()}
      disabled={!!chatExist}
    >
      <div className="flex items-center justify-between">
        <UserPreview user={props.user} dissabled={true} />
        <BiMessageAdd className=" text-3xl" />
      </div>
    </button>
  );
}

export default CreateChat;
