import React, { useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Peer from "simple-peer";
import { socket } from "./socket";
import { useReactiveVar } from "@apollo/client";
import { iAmMessagingWithVar, mySocketIdVar } from "./messengerState";
import { useLogginedUserdata } from "@/hooks/user";
import { connectType } from "../../../types/messengerType";
function VideoCall() {
  const [stream, setStream] = useState<MediaStream | undefined>();
  const mySocketId = useReactiveVar(mySocketIdVar);
  const { data: logginedUser } = useLogginedUserdata();
  const IAmMessagingWith = useReactiveVar(iAmMessagingWithVar);

  function record() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then(() => setStream(stream));
  }
  function call() {
    if (!mySocketId) {
        console.log("No My socketId");
        return;
      }
    record();  
     socket.emit("getSocketId",{...iAmMessagingWithVar,from:mySocketId})
     socket.on("getSocketId",(friendSocketId:string)=>{
        if(!friendSocketId){console.log("friend Offline");
        }
     callTo(friendSocketId)
     })

     function callTo(toSocket:string){
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal) => {

     
   
      const callto: connectType = {
        user: logginedUser.user,
        from: mySocketId!,
        to: toSocket,
        signal: signal,
      };
      socket.emit("call", callto);
    });
    peer.on("stream", (signal) => {
      console.log("stream p1");
    });
    peer.on("connect", () => {
      console.log("connected p1");
    });

}
  }
  return (
    <div>
      <BsFillCameraVideoFill
        className=" text-blue-600 cursor-pointer"
        onClick={() => {
          call();
        }}
      />
    </div>
  );
}

export default VideoCall;
