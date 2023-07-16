import React, { useEffect, useState } from "react";
import { socket } from "../messenger/socket";

function IsOnlineColor({
  candidateId,
}: {
  candidateId: string | string[] | undefined;
}) {
  const [isOnline, setIsOnline] = useState(false);
useEffect(()=>{
  socket.on("check-connection", () => {
    socket.emit("isOnline", candidateId);

  });

socket.emit("isOnline", candidateId);

 socket.on("isOnline", (val: boolean) => {
    console.log(val);
    
    setIsOnline(!!val);
  });
},[candidateId])

 
  return (
    <div className=" text-gray-400 flex justify-between w-32 items-center">
      {" "}
      <h6
        className={` h-[20px] w-[20px] rounded-full border-2 bg-gray-500 ${
          isOnline && "bg-green-500"
        }`}
      ></h6>
      <h6 className={`  font-bold ${isOnline && "text-blue-500"} `}>
        {" "}
        {isOnline ? "Online" : "Offline"}
      </h6>
    </div>
  );
}

export default IsOnlineColor;
