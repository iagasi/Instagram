import { useLogginedUserdata, usePageFriendsQuery } from "@/hooks/user";
import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview";
import IsOnline from "./IsOnline";
import { socket } from "./messenger/socket";
import { UserType } from "@/__generated__/graphql";
import { connectedUsersVar } from "@/reactive/user";
import { useReactiveVar } from "@apollo/client";

function OnlineFriends() {
  const { data: loggedUser } = useLogginedUserdata();
  //const [connectedUsers, setConnectedUsers] = useState<UserType[]>([]);
  const { data: profileFriends, refetch: refetchFriends } = usePageFriendsQuery(
    loggedUser?.user._id,
    false
  );

  const connectedUsers=useReactiveVar(connectedUsersVar)
 
  return (
    <div className=" pt-20 shadow-lg">
      <h3 className=" font-bold text-lg text-gray-500"> Friends</h3>

      <div>
        {profileFriends?.followings?.map((user) => (
          <div key={user?._id} className=" text-sm">
            <IsOnline user={user} connectedUsers={connectedUsers} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineFriends;
