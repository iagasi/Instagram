import React, { useEffect, useRef, useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Peer from "simple-peer";
import { socket } from "./socket";
import { useReactiveVar } from "@apollo/client";
import {
  callerVar,
  iAmMessagingWithVar,
  mySocketIdVar,
} from "./messengerState";
import { useLogginedUserdata } from "@/hooks/user";
import { connectType } from "../../../types/messengerType";
import UserPreview from "../UserPreview";
import Video from "./Video";
import IsOnline from "../IsOnline";
import IsOnlineColor from "../profile/IsOnlineColor";
function VideoCall() {
  const audio = new Audio("./music/make-call.wav");
  const [outcomCall, setOutcomall] = useState(false);

  const [stream, setStream] = useState<MediaStream | undefined>();
  const mySocketId = useReactiveVar(mySocketIdVar);
  const { data: logginedUser } = useLogginedUserdata();
  const IAmMessagingWith = useReactiveVar(iAmMessagingWithVar);
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const resVideo = useRef<HTMLVideoElement | null>(null);

  const connectionRef = useRef<Peer.Instance | null>(null);
  const [makeCall, setMakeCall] = useState(false);

  function record(): Promise<MediaStream> {
    return new Promise((res, rej) => {
      navigator.mediaDevices.getUserMedia({ video: true,audio:true }).then((st) => {
        setStream(st);
        res(st);
      });
    });
  }

  console.log(outcomCall);
  
  useEffect(() => {
    if (outcomCall) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
    }
    if (!outcomCall) {
      audio.pause();
      //socket.off("answer");
    }
    return () => {
      audio.pause();
     // socket.off("answer");
      stream?.getTracks().forEach((track) => {
        console.log(track);

        track.stop();
      });
    };
  }, [outcomCall]);

  if (stream && myVideo.current) {
    myVideo.current.srcObject! = stream;
  }
  function call() {
    if (!mySocketId) {
      console.log("No My socketId");
      return;
    }
    setOutcomall(true);
    setMakeCall(true);
    record();
    socket.emit("getSocketId", { ...IAmMessagingWith, from: mySocketId });
    socket.on("getSocketId", (friendSocketId: string) => {
      if (!friendSocketId) {
        console.log("friend Offline");
      } else {
        console.log("callto " + friendSocketId);
      }
      callTo(friendSocketId);
    });

    async function callTo(toSocket: string) {
      setMakeCall(true);
      const MYVIDEO = await record();

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: MYVIDEO,
      });
      setStream(MYVIDEO);

      peer.on("signal", (signal) => {
        const callto: connectType = {
          user: logginedUser.user,
          from: mySocketId!,
          to: toSocket,
          signal: signal,
        };
        socket.emit("call", callto);
      });
      peer.on("stream", (stream) => {
        if (resVideo.current) {
        
          console.log("stream p1/////////////////////////");

          resVideo.current.srcObject = stream;
        }
      });
      peer.on("connect", () => {
        console.log("connected p1");
      });

      socket.on("answer", (data: Omit<connectType, "user" | "from">) => {
        console.log(data.signal);
        peer.signal(data.signal);
    setOutcomall(false);
      });

      peer.on("close", () => {
        console.log("peer closed");
        socket.off("answer");
        setOutcomall(false);
      });
      connectionRef.current = peer;
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

      {makeCall && (
        <div className="">
          <Video
            myVideo={myVideo}
            resVideo={resVideo}
            close={() =>{ 
              setMakeCall(false)
            connectionRef.current?.destroy()
            }}
            connectionRef={connectionRef}
            videoStream={stream}
          >
            <div className=" text-center flex flex-col items-center">
              {/* <h1> Calling...</h1> */}

              <UserPreview user={IAmMessagingWith} />
              <IsOnlineColor candidateId={IAmMessagingWith?._id}/>
            </div>
          </Video>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
