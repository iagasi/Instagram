import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      requred: true,
    },
   image: {
        type: String,
        default:"",
      },
  });
  
  export const UserDb = mongoose.model("user", UserSchema);
  