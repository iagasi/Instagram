import mongoose from "mongoose"

const TokenSchema = new mongoose.Schema({
    
      userId: {
        type: String,
        required: true,
      },
      refreshToken: {
        type: String,
        required: true,
      },
     
  });
  
  export const TokenDb = mongoose.model("token", TokenSchema);
  