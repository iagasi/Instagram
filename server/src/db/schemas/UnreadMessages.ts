import mongoose, { Schema, } from "mongoose";

const UnreadSchema = new mongoose.Schema({

 userId: {
    type:String,
    default:"",
  },
  chatId: {
    type:String,
    default:"",
   
  },
});

export const UnreadDb = mongoose.model("unreads", UnreadSchema );