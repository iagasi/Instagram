import { Mutation } from "@/__generated__/graphql";
import { useLogginedUserdata } from "@/hooks/user";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

 const createChat = gql(`
mutation createChat($input: CreateChatInput) {
    createChat(input: $input) {
    _id
   users
    }
  }`);

export function useCreateChat(chatWithId:string){
  const [l,setL]=useState(false)
  const [mutateFunction, { data },] = useMutation(createChat);
  const { data: loggineUserData, loading } = useLogginedUserdata();
  function createChatHandler() {
    mutateFunction({
      variables: {
        input: {
          user1Id: loggineUserData.user._id,
          user2Id: chatWithId,
        },
      },
    });
    setL(true)
  }
  useEffect(()=>{
    setL(false)
  },[data])
return {createChat:createChatHandler,data,loading:l}
}