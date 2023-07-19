import { connectType } from "@/../types/messengerType";
import React, { useEffect, useRef, useState } from "react";
import UserPreview from "../UserPreview";
import { socket } from "./socket";
import { callerVar } from "./messengerState";
import { useReactiveVar } from "@apollo/client";
import Peer from "simple-peer";
import Video from "./Video";
import IsOnlineColor from "../profile/IsOnlineColor";

function AnswerCall() {
  const audio = new Audio("/music/receive-call.mp3");
  const [incomCall, setIncomCall] = useState(false);
  const caller = useReactiveVar(callerVar);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [answer, setAswer] = useState<boolean>(false);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const resVideo = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    socket.on("call", (caller) => {
      callerVar(caller);
      setIncomCall(true)
    });
  }, []);
  useEffect(() => {
    if (incomCall) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
    }
    if (!incomCall) {
      audio.pause();
    }
    return () => {
      audio.pause();
    };
  }, [incomCall]);
  function record(): Promise<MediaStream> {
    return new Promise((res, rej) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((st) => {
        setStream(st);
        res(st);
      });
    });
  }
  async function answerHandler() {
    const MYVIDEO = await record();
    setAswer(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: MYVIDEO,
    });
    peer.signal(caller?.signal);

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

      if (myVideo.current) {
        myVideo.current.srcObject = MYVIDEO as MediaStream;
      }
    });
    console.log(caller?.signal);

    connectionRef.current = peer;
  }
  return (
    <div>
      {caller && !answer && (
        <div className=" fixed bg-stone-300 text-lg p-5 w-[300px] z-50  top-5">
          <h1>Calling....</h1>
          <UserPreview user={caller.user} />

          <div className=" flex justify-between">
            <button
              className=" bg-green-600 p-3 rounded-md"
              onClick={() => {
                answerHandler();
                setIncomCall(false);
              }}
            >
              Answer
            </button>
            <button
              className=" bg-red-600  p-3 rounded-md"
              onClick={() => {
                callerVar(null);
                setIncomCall(false);
                connectionRef.current?.destroy()
              }}
            >
              Decline
            </button>
          </div>
        </div>
      )}
      {answer && (
        <Video
          myVideo={myVideo}
          resVideo={resVideo}
          connectionRef={connectionRef}
          close={() => {
            setAswer(false);
            callerVar(null);
          }}
          videoStream={stream}
        >
           
            <div className=" text-center flex flex-col items-center">
              {/* <h1> Calling...</h1> */}

              <UserPreview user={caller?.user} />
              <IsOnlineColor candidateId={caller?.user._id}/>
            </div>
          </Video>
      )}
    </div>
  );
}

export default AnswerCall;
