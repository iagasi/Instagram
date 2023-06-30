import { throws } from "assert";
import { ChatService } from "../services/chatDb";
import { UserService } from "../services/userService";
import { PubSub, withFilter } from "graphql-subscriptions";
import {
  chatType,
  messageType,
  unreadMessageType,
} from "../../../types/chatType";

const pubsub = new PubSub();

 async function newMessage(message: messageType) {
 const chat= await ChatService.getSingleChat(message.chatId)
 const friendId=chat?.users.find(id=>message.userId!==id)
 if(friendId){

  const createdMessage= await ChatService.unreadMessageSet({
    userId:friendId,
    chatId: message?.chatId,
  });
  pubsub.publish("LISTEN_MESSAGE", { listenMessages: createdMessage });


 }

  
}
async function newMessaesPermisions(
  message: unreadMessageType,
  subscribedUserId: string
): Promise<boolean> {



  return subscribedUserId.toString() === message.userId.toString();
}

async function message(message: messageType) {
  const id=Math.random().toString()
  const createdMessage=await ChatService.addMessage({
    _id: id,
    chatId: message.chatId,
    message: message.message,
    userId: message.userId,
    timeStamp: Date.now().toString(),
  });
  pubsub.publish("MESSAGE", { receiveMessage: createdMessage });
}
export const chatResolver = {
  Query: {
    async getChats(paretn: any, args: { userId: string }) {
      const res = [];
      const chats = await ChatService.getchats(args.userId);
      

      for await (const chat of chats) {
        let friendId = null;
        friendId = chat.users.find((e) => e !== args.userId);

        if (!friendId) return "userNot found";
        const friendData = await UserService.getSingleUser(friendId);
        res.push({
          chat: chat,
          chatWithInfo: friendData,
        });
      }

      return res;
    },

    async getMessages(paretn: any, args: { chatId: string }) {
      const messages = await ChatService.getchatsMessages(args.chatId);
      
      return messages;
    },
    async unreadMessagesGet(paretn: any, args: { userId: string }) {
      return  await ChatService.unreadMessageGet(args.userId);
    },
  },
  Mutation: {
    sendMessage: async (p: any, args: { input: messageType }) => {
      const chat = ChatService.getSingleChat(args.input.chatId);
      if (chat && chat.users.includes(args.input.userId)) {
  
        newMessage(args.input);
        message(args.input);
        
      } else {
        throw new Error("You  are not allowed write int this chat");
      }
    },

    createChat: (
      parrent: any,
      args: { input: { user1Id: string; user2Id: string } }
    ) => {
      return ChatService.createChat(args.input.user1Id, args.input.user2Id);
    },

    deleteChat: (
      parrent: any,
      args: { input: { chatId: string; userId: string } }
    ) => {
      return ChatService.deleteChat(args.input.chatId, args.input.userId);
    },
    unreadMessageSet: async function (
      parrent: any,
      args: { input: Omit<unreadMessageType, "_id"> }
    ) {
      ChatService.unreadMessageSet(args.input);
    },
    unreadChatMessagesDelete:async function ( parrent: any,
      args: { input: {chatId:string} }){
      return  ChatService.unreadChatMessagesDelete(args.input.chatId)
      }

  },

  Subscription: {
    receiveMessage: {
      subscribe: withFilter(
        (parrent: any, args: { input: { chatId: string } }) => {console.log("subscribe");
        
          return pubsub.asyncIterator(["MESSAGE"]);
        },

        (
          payload: { receiveMessage: messageType },
          args: { input: { chatId: string } }
        ) => {
         // console.log("subscribe")
          const subscribeToChat = args.input.chatId;
          const receivedMessageInChat = payload.receiveMessage.chatId;
          return subscribeToChat === receivedMessageInChat;
        }
      ),
      // subscribe:()=>pubsub.asyncIterator(["MESSAGE"])
    },

    listenMessages: {
      subscribe: withFilter(
        (parrent: any, args: { input: messageType }) => {
          console.log("unread subscribe111");

          return pubsub.asyncIterator(["LISTEN_MESSAGE"]);
          
        },
       async (
          payload: { listenMessages: unreadMessageType },
          args: { input: messageType }
        ) => {
     
          const subscribedUser = args.input.userId;
          return  await newMessaesPermisions(payload.listenMessages, subscribedUser);
        }
      ),
    },
  },
};

export const chatTypeDefs = `#graphql
type MessagaeType{
  _id:String
  chatId: String
  message: String
  timeStamp: String
  userId:String
}

type chatType{
  _id: String,
   users:[String]

}
type messageType{
    
    _id: String,
    chatId: String,
    message: String,
    timeStamp:String,
    userId: String,
  
}
type UserType{
  _id:String
   name: String
   surname: String
   image:String
 }

 type GetChatsType{
  chat:chatType
  chatWithInfo:UserType
 }

 type unreadMessageType{
  _id:String
  userId:String
  chatId:String
}


  type Query {
    getChats(userId:String):[GetChatsType]
    getMessages(chatId:String):[messageType]
    unreadMessagesGet(userId:String):[unreadMessageType]
  }
input inputReceiveMessage{
  _id:String
  chatId: String
  message: String
  timeStamp: String
  userId:String
}


  type Subscription {
    receiveMessage(input:inputReceiveMessage): MessagaeType
    listenMessages(input:inputReceiveMessage):unreadMessageType
  }


  input MessageInput{
  chatId: String
  message: String
  timeStamp: String
  userId: String
  }

  input CreateChatInput{
    user1Id:String
    user2Id:String
  }
  type CreateChatType{
    _id:String
    users:[String]
  }

  input deleteChatInput{
    chatId:String
    userId:String
  }

  input unreadMessageInput{
    userId:String
    chatId:String
  }
  input deleteUnreadType{
    chatId:String
  }
  type Mutation{
    sendMessage(input:MessageInput):MessagaeType
    createChat(input:CreateChatInput): CreateChatType
    deleteChat(input:deleteChatInput):String
  unreadMessageSet(input: unreadMessageInput):String
  unreadChatMessagesDelete(input:deleteUnreadType):String
  }
`;
