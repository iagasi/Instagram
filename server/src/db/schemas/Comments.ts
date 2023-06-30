import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const CommentsSchema = new mongoose.Schema({
  postId: {
    type:   Schema.Types.ObjectId,
    default: "",
  },
  personId: {
    type:  Schema.Types.ObjectId,
    default: "",
  },
  message: {
    type: String,
    default:"",
  },
  time: {
    type: String,
    default: "",
  },
  likes:{
    type:[ Schema.Types.ObjectId],
    default:[]
  }
});

export const CommentsDb = mongoose.model("comments", CommentsSchema);
