import mongoose, { Schema, } from "mongoose";

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
 userId: {
    type:String,
    default:"",
    ref:"user"
  },
  comments: {
    type: [Schema.Types.ObjectId,{ref:"comments"}],
    default: [],
    
  },
  likes: {
    type: [String],
    default: [],
  },
});

export const PostsDb = mongoose.model("posts", PostSchema);
