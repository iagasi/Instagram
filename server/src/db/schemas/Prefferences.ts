import { ObjectId } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";

const PrefferenceSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:"user"
  },
  followers: {
    type: [String],
    default: [],
  },
  followings: {
    type: [String,],
    default: [],
  },
  posts: {
    type:[Schema.Types.ObjectId],
    default: [],
  },
  saved: {
    type: [String],
    default: [],
  },
  tagged: {
    type: [String],
    default: [],
  },
});

export const PrefferenceDb = mongoose.model("prefferences", PrefferenceSchema);
