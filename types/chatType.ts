import { UserType } from "./userType"

export type  chatType= {
    _id: string,
  users:string[]
  }


  export type chatsAndFriendsType={
chat:chatType
chatWithInfo:UserType
  }

  export type messageType={
    
        _id: string,
        chatId: string,
        message: string,
        timeStamp:string,
        userId: string,
      
  }

  export type unreadMessageType={
    _id:string
    userId:string
    chatId:string
  }