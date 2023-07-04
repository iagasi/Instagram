import mongoose, { Schema, } from "mongoose";

const ChatsSchema = new mongoose.Schema({

  users: {
    type: [Schema.Types.ObjectId,{ref:"user"}],
    default: [],
    
  },

});

export const ChatDb = mongoose.model("chats", ChatsSchema);