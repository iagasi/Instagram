import { chatsAndFriendsType, messageType, unreadMessageType } from "@/../types/chatType";
import { Query } from "@/__generated__/graphql";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { log } from "console";
const chatGql=gql(`
query GETCHATS($userId:String){
    getChats(userId:$userId){
      chat {
        _id
       users
      }
      chatWithInfo {
        _id
        image
        name
        surname
      }
    }
  }
`)

export function useGetChats(logginedUserId:string){
const {data,loading,refetch}=useQuery<Query>(chatGql,{variables:{userId:logginedUserId}})
const chat=data?.getChats as chatsAndFriendsType[]
return {data:chat,loading,refetch}
}


export const getChatMessagsGql=gql`
query GetMessages($chatId: String) {
    getMessages(chatId: $chatId) {
      _id
      chatId
      message
      timeStamp
      userId
    }
  }


`
export function useGetMessages(chatId:string|null){
   
    const {data,loading,subscribeToMore,refetch}=useQuery<Query>(getChatMessagsGql,{variables:{chatId:chatId},skip:!chatId})    
    const messages=data?.getMessages as messageType[] |undefined
    return {data:messages,loading,subscribeToMore,refetch}
    }
    
     export const listenChatMessagesGql=gql(`
     subscription receiveMessage($input: inputReceiveMessage){
      receiveMessage(input: $input) {
          _id
          chatId
          timeStamp
          message
          userId
         
        }
      }
    `)

     
    export function useSubscriptionChatMessage(chatId:string){
      const  res= useSubscription(
        listenChatMessagesGql,
        { variables: { input:{chatId} }}
      );
      const data:messageType=res?.data?.receiveMessage 
     return {data}
    }
  const unreadMessagesGetGql=gql(`
  query UnreadMessagesGet($userId: String) {
    unreadMessagesGet(userId: $userId) {
      _id
      userId
      chatId
    }
  }
  `)  

    export function useUnreadMessagesGet(userId:string){
const {data,refetch,subscribeToMore}=useQuery<Query>(unreadMessagesGetGql,{
  variables:{userId}
})
const res=data?.unreadMessagesGet as unreadMessageType[]|undefined
return {data:res,refetch,subscribeToMore}
    }




   export const subscribeUnreadMessages=gql(`
    subscription receiveMessage($input: inputReceiveMessage){
      listenMessages(input: $input) {
        _id
        chatId
        userId
      }
    }
    `)


    export function useSubscribeUnreadMessages(userId:string){
const {data}=useSubscription(subscribeUnreadMessages,{
  variables:{input:{userId}}
})


return {data:data?.listenMessages}
    }