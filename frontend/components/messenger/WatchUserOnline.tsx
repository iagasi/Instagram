import React, { useEffect, useState } from 'react'
import { socket } from './socket';
import { mySocketIdVar } from './messengerState';
import { connectedUsersVar } from '@/reactive/user';
import { useLogginedUserdata } from '@/hooks/user';
import { UserType } from '../../../types/userType';

function WatchUserOnline({watchAdditionalUsers=[]}:{watchAdditionalUsers?:string[]|[]}) {
    const [refetch, setRefetch] = useState(false);
    const { data: loggedUserData } = useLogginedUserdata();

  useEffect(() => {
    socket.emit("connectedUsers", [...loggedUserData.prefferences.followings,...watchAdditionalUsers]);
    socket.on("connectedUsers", (users) => {
      connectedUsersVar(users);
      // setConnectedUsers(users)
    });
  }, [refetch]);

  socket.on("check-connection", () => {
    setRefetch(!refetch);
  });


  useEffect(() => {
    socket.emit("setUser", loggedUserData.user);
    socket.on("setUserId", (id) => {
      mySocketIdVar(id);
      
    })
  },
 
  
 []);
  return (
    <></>
  )
}

export default WatchUserOnline