import { throws } from "assert";
import { ChatService } from "../services/chatDb";
import { UserService } from "../services/userService";
import { PubSub, withFilter } from "graphql-subscriptions";
import { log } from "console";
import { postService } from "../services/postsService";
import {
  chatType,
  messageType,
  unreadMessageType,
} from "../../../types/chatType";

const pubsub = new PubSub();

function newMessage(message?: messageType) {

  pubsub.publish("LISTEN_MESSAGE", { listenMessages: message });
  return message;
}
async function newMessaesPermisions(
  message: messageType,
  subscribedUserId: string
): Promise<boolean> {
  if (subscribedUserId !== message.userId) {
    await ChatService.unreadMessageSet({
      userId: subscribedUserId,
      chatId: message.chatId,
    });
  }
  return subscribedUserId !== message.userId;
}

function message(message: messageType) {
  pubsub.publish("MESSAGE", { receiveMessage: message });
  return message;
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
      return ChatService.unreadMessageGet(args.userId);
    },
  },
  Mutation: {
    sendMessage: async (p: any, args: { input: messageType }) => {
      const chat = ChatService.getSingleChat(args.input.chatId);
      if (chat && chat.users.includes(args.input.userId)) {
        await ChatService.addMessage({
          _id: Math.random().toString(),
          chatId: args.input.chatId,
          message: args.input.message,
          userId: args.input.userId,
          timeStamp: Date.now().toString(),
        });

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
      console.log("delete");

      return ChatService.deleteChat(args.input.chatId, args.input.userId);
    },
    unreadMessageSet: async function (
      parrent: any,
      args: { input: Omit<unreadMessageType, "_id"> }
    ) {
      ChatService.unreadMessageSet(args.input);
    },
  },

  Subscription: {
    receiveMessage: {
      subscribe: withFilter(
        (parrent: any, args: { input: { chatId: string } }) => {
          return pubsub.asyncIterator(["MESSAGE"]);
        },

        (
          payload: { receiveMessage: messageType },
          args: { input: { chatId: string } }
        ) => {
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
          return pubsub.asyncIterator(["LISTEN_MESSAGE"]);
        },
        (
          payload: { listenMessages: messageType },
          args: { input: messageType }
        ) => {
          const subscribedUser = args.input.userId;

          return newMessaesPermisions(payload.listenMessages, subscribedUser);
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
    listenMessages(input:inputReceiveMessage):MessagaeType
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
  type Mutation{
    sendMessage(input:MessageInput):MessagaeType
    createChat(input:CreateChatInput): CreateChatType
    deleteChat(input:deleteChatInput):String
  unreadMessageSet(input: unreadMessageInput):String
  }
`;
