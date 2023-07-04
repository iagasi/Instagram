import mongoose, { Schema, } from "mongoose";

const MessagesSchema = new mongoose.Schema({

 userId: {
    type:mongoose.Types.ObjectId,
    default:"",
    ref:"user"
  },
  chatId: {
    type:String,
    default:"",
    ref:"chats"
  },
  message: {
    type:String,
    default:"",
  },
  timeStamp: {
    type:String,
    default:"",
  },
});

export const MessageDb = mongoose.model("messages", MessagesSchema);