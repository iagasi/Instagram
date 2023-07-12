import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview";
import { UserType } from "../../types/userType";
import { socket } from "./messenger/socket";
import { mySocketIdVar } from "./messenger/messengerState";
import { useReactiveVar } from "@apollo/client";

function IsOnline({ user ,connectedUsers,dissabled}: { user: UserType,connectedUsers:UserType[],dissabled?:boolean}) {

const isOnline=!!connectedUsers.find(c=>c._id==user._id)

console.log(isOnline);

// return <div></div>
  return (
    <div className=" relative text-gray-600">
      <UserPreview user={user} dissabled={dissabled} />
    
      <div className=" text-gray-400 absolute bottom-3 left-11 flex justify-between w-32 items-center">
        {" "}
        <h6
          className={` h-4 w-4 rounded-full border-2 bg-gray-500 ${
            isOnline && "bg-green-500"
          }`}
        ></h6>
        <h6 className={`  font-bold ${isOnline && "text-blue-500"} `}>
          {" "}
          {isOnline ? "Online" : "Offline"}
        </h6>
      </div>
    </div>
  );
}

export default IsOnline;
