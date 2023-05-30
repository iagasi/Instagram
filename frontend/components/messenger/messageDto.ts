import { messageType } from "../../../types/chatType";


export class MessageDto implements Omit<messageType,"_id"> {
    chatId: string;
    message: string;
    timeStamp: string;
    userId: string;
    constructor(input:Omit<messageType,"_id">){
        this.message=input.message
        this.timeStamp=Date.now().toString()
        this.userId=input.userId
        this.chatId=input.chatId
    }
  }

