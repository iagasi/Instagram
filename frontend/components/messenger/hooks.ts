import { Mutation } from "@/__generated__/graphql";
import { useLogginedUserdata } from "@/hooks/user";
import { gql, useMutation } from "@apollo/client";

 const createChat = gql(`
mutation createChat($input: CreateChatInput) {
    createChat(input: $input) {
    _id
   users
    }
  }`);

export function useCreateChat(chatWithId:string){
  const [mutateFunction, { data }] = useMutation<Mutation>(createChat);
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
  }
return {createChat:createChatHandler,data}
}