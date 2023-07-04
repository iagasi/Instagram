import {
  chatType,
  messageType,
  unreadMessageType,
} from "../../../types/chatType";
import { ChatDb } from "../db/schemas/Chats";
import { MessageDb } from "../db/schemas/Messages";
import {  UnreadDb } from "../db/schemas/UnreadMessages";


export const ChatService = {
  getSingleChat: async function (chatId: string): Promise<chatType | null> {
    
    const chat = await ChatDb.findById(chatId) as chatType | null;
    
    return chat;
  },
  getchats: async function (userId: string): Promise<chatType[] | null> {
    const myChat= await ChatDb.find( { users: { $all: [userId] } }) as chatType[] | null

    return myChat;
  },

  getchatsMessages:  async function (chatId: string): Promise<messageType[]> {
    const myChat = await MessageDb.find({chatId:chatId}) as messageType[]
    if(myChat){
          myChat.sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));

    }
    return myChat

  },

  addMessage: async function (message:{ 
    chatId: string;
    message: string;
    timeStamp: string;
    userId: string;}) {

   const newMessage=await new MessageDb(message).save()
  
    return newMessage;
  },

  eleteMessage:  async function d(messageId: string) {
    await MessageDb.findByIdAndDelete(messageId)
  },

  deleteChat: async function (chatId: string, userId: string) {

    await MessageDb.deleteMany({chatId:chatId})
    await ChatDb.findByIdAndDelete(chatId)
   await UnreadDb.deleteMany({chatId:chatId})
    return chatId;
  },

  createChat: async function (user1Id: string, user2Id: string) {

    
    const ischatExist= await ChatDb.findOne( { users: { $all: [user1Id,user2Id] } })
    if (ischatExist) {
      console.log("Chat already exists");
      
      return "Chat already exists";
      throw Error();
    }
    
    const newChat = {
      userId:user1Id,
      users: [user2Id, user1Id,],
    };
   const createdchat= await new ChatDb(newChat).save()
  
   
    return createdchat;
  },

  unreadMessageGet: async function (
    userId: string
  ): Promise<unreadMessageType[]> {
return await UnreadDb.find({userId:userId})
  },
  unreadChatMessagesDelete: async function (chatId: string,userId:string) {


await UnreadDb.deleteMany({$and:[{chatId:chatId},{userId:userId}]})
    return "ok";
  },
  unreadMessageSet:async function (unread: Omit<unreadMessageType, "_id">) {
   const unreadMessage= new UnreadDb(unread)
  await  unreadMessage.save()
 
const unreades= await UnreadDb.findById(unreadMessage._id)
return unreades
  },
};
