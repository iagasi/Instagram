
import { log } from "console"
import mongoose from "mongoose"
import { MONGO_URI } from "../serverConstants";

export async function connectDb(){
    if(!MONGO_URI) { console.log("Connection url Undefined");
    return}
 mongoose.connect(MONGO_URI,)
 .then(()=>{console.log("Mongo connected");
 })
 .catch((err)=>{
  //  console.log(err);
    
console.log("Connection Error Mongo Db");


 })

}
