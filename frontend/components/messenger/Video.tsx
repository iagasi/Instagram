import React, { useEffect } from 'react'
import Peer from "simple-peer";

type propsType={
    myVideo:React.MutableRefObject<HTMLVideoElement | null>
    resVideo:React.MutableRefObject<HTMLVideoElement | null>

    connectionRef:React.MutableRefObject<Peer.Instance|null>
    close:()=>void
    videoStream:MediaStream|undefined
    children?:JSX.Element
}
function Video({myVideo,connectionRef,close,videoStream,resVideo ,children}:propsType) {
  useEffect(()=>{
    return()=>{
     
    }
  },[])
  return (
    <div className='fixed top-0 left-0 bg-slate-600 text-white p-5 w-screen h-screen  z-30'>
       {
        children
       }
       
          <video
              className=" w-full  border-2 absolute left-5 bottom-5 bg-black"
              ref={resVideo}
              autoPlay
          
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
                myVideo.current?.pause()
                resVideo.current?.pause()
                // myVideo.current.src=''
                // resVideo.current.src=""
                videoStream?.getTracks().forEach(track => track.stop());
  
               close();
              }}
            >
              Cancell
            </button>



    </div>
  
  )
}

export default Video