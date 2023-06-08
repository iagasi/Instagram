import React from 'react'
import Peer from "simple-peer";

type propsType={
    myVideo:React.MutableRefObject<HTMLVideoElement | null>
    resVideo:React.MutableRefObject<HTMLVideoElement | null>

    connectionRef:React.MutableRefObject<Peer.Instance|null>
    close:()=>void
    videoStream:MediaStream|undefined
}
function Video({myVideo,connectionRef,close,videoStream,resVideo }:propsType) {
  return (
    <div>
          <video
              className=" w-full  border-2 absolute left-5 bottom-5"
              ref={resVideo}
              autoPlay
              controls
            />
  <video
              className=" w-[200px] h-[200px] border-2 absolute left-5 bottom-5"
              ref={myVideo}
              muted
              autoPlay
              controls
            />
            <button
              className=" absolute left-0 right-0 bottom-7 w-fit m-auto bg-red-600 rounded-md p-2 "
              onClick={() => {
                connectionRef.current?.destroy();
                close();
                videoStream?.getTracks()[0].stop()
              }}
            >
              Cancell
            </button>



    </div>
  
  )
}

export default Video