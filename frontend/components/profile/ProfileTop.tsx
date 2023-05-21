import Image from "next/image";
import React from "react";

import { UserAndPrefferncesType, UserType } from "../../../types/userType";
import OpenSettings from "./OpenSettings";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";

import { OtherPersonProfile } from "./othetPerson/OtherPersonProfile";
import { log } from "console";
import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { DeleteOrAddToFriends } from "../DeleteOrAddToFriends";
import { useQuery, useReactiveVar } from "@apollo/client";
import { gql } from "@apollo/client";
import { Query } from "@/__generated__/graphql";
import { userVar, visitedPersonFriendsVar, visitedPersonVar } from "@/reactive/user";
import { userFriendsGql } from "@/gql/user";
import { usePageFriendsQuery } from "@/hooks/user";
import { LStorage } from "@/helpers/user";



type PropsType={
  visitedUser: UserAndPrefferncesType
  profileFriends:any
}
export function ProfileTop({ visitedUser,profileFriends }: PropsType) {
const router=useRouter()

console.log("top");

  if (!visitedUser?.prefferences?.posts) {
    return <div>Loading profileTop</div>;
  }
  const myProfile = router.query.id ==LStorage.getUser()?.user._id;

  return (
    <div className=" flex mx-auto space-x-20 pb-8 pt-8  w-fit">
      <Image
        className=" rounded-full h-[150px] w-[150px]"
        src={"/test.jpg"}
        height={150}
        width={150}
        alt="profile image"
      />
      <div className=" space-y-5">
        <div className=" justify-between flex   items-center space-x-4">
          <span className=" font-bold h-fit">
            {visitedUser.user.name} {visitedUser.user.surname}
          </span>

          {myProfile ? (
            <>
              <EditProfile />
              <OpenSettings />
            </>
          ) : (
            <OtherPersonProfile
              profileOwner={visitedUser}
            />
          )}
        </div>
        <div className="  flex space-x-5">
          {/* <PostModal user={user} users={user.prefferences.posts}/> */}
         <FollowersModal  friends={profileFriends?.followers} buttonName={"Delete"}  />
         <FollowingsModal friends={profileFriends?.followings} buttonName={"Unsubscribe"} />
        </div>
      </div>
    </div>
  );
}
















function Followers(props:withModalType&{ friends:[string], buttonName:"Delete"|"Unsubscribe"},){
return(
  <p className=" cursor-pointer" onClick={props.setModal}> <strong>{props.friends?.length}</strong> followers</p>

)
}
const FollowersModal=WithModal(Followers,DeleteOrAddToFriends)

function Followings(props:withModalType&{ friends:[string]},){
  return(
    <p className=" cursor-pointer" onClick={props.setModal}> <strong>{props.friends?.length}</strong> follwings</p>

  )
  }
  const FollowingsModal=WithModal(Followings,DeleteOrAddToFriends)
  
