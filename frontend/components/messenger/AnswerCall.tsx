import { connectType } from "@/../types/messengerType";
import React, { useEffect, useRef, useState } from "react";
import UserPreview from "../UserPreview";
import { socket } from "./socket";
import { callerVar } from "./messengerState";
import { useReactiveVar } from "@apollo/client";
import Peer from "simple-peer";

function AnswerCall() {
  const caller = useReactiveVar(callerVar);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [answer, setAswer] = useState<boolean>(false);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const resVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    socket.on("call", (caller) => {
      callerVar(caller);
    });
  }, []);

  useEffect(() => {
    if (answer) {
      record();
    }
  }, [answer]);
  function record():Promise<MediaStream> {
return new Promise((res,rej)=>{
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((st) =>{ setStream(st); res(st)});
})
    
  }
  async function answerHandler() {
 const  MYVIDEO=  await record()
    
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: MYVIDEO,
    });
    peer.signal(caller?.signal)

    peer.on("signal", (signal) => {
      if (!caller?.from) {
        console.log("caller Id undefuned");
        return;
      }
      const answer: Omit<connectType, "user" | "from"> = {
        to: caller?.from,
        signal: signal,
      };
      socket.emit("answer", answer);
    });
    peer.on("stream", (stream) => {
      console.log("stream p answer      //////////////////////////");
      if (resVideo.current) {
        resVideo.current.srcObject = stream;
      }
    });
    peer.on("connect", () => {
      console.log("connected answer");
    });
    console.log(caller?.signal);
    
    connectionRef.current = peer;
  }
  return (
    <div>
      {caller && (
        <div className=" fixed bg-stone-300 text-lg p-5 w-[300px] z-50  top-5">
          <h1>Calling....</h1>
          <UserPreview user={caller.user} />

          <div className=" flex justify-between">
            <button className=" bg-green-600 p-3 rounded-md"
            onClick={answerHandler}
            >Answer</button>
            <button
              className=" bg-red-600  p-3 rounded-md"
              onClick={() => callerVar(null)}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswerCall;
