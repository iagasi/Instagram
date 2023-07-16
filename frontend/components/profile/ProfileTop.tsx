import Image from "next/image";
import React from "react";

import { UserAndPrefferncesType } from "../../../types/userType";
import OpenSettings from "./OpenSettings";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";

import { OtherPersonProfile } from "./othetPerson/OtherPersonProfile";
import { log } from "console";
import { WithModal } from "@/Hoc/WithModal";
import { withModalType } from "@/types/modalTypes";
import { DeleteOrAddToFriends } from "../DeleteOrAddToFriends";
import { LStorage } from "@/helpers/user";
import { profileImage } from "@/helpers/image";
import { useReactiveVar } from "@apollo/client";
import { connectedUsersVar } from "@/reactive/user";
import IsOnline from "../IsOnline";
import IsOnlineColor from "./IsOnlineColor";
import { UserType } from "@/__generated__/graphql";

type PropsType = {
  visitedUser: UserAndPrefferncesType;
  profileFriends:{followings: UserType[],
  followers: UserType[]}
};
export function ProfileTop({ visitedUser, profileFriends }: PropsType) {
  const router = useRouter();
  const connectedUsers = useReactiveVar(connectedUsersVar);

  if (!visitedUser?.prefferences?.posts) {
    return <div>Loading profileTop</div>;
  }
  const myProfile = router.query.id == LStorage.getUser()?._id;

  return (
    <div className=" flex mx-auto space-x-20 pb-8 pt-8  w-fit   max-sm:space-x-6 ">
      <div className=" relative bg-gray-100h-[150px] w-[150px]  max-sm:w-[80px] max-sm:h[80px]  ">
        <Image
          className=" rounded-full "
          src={profileImage(visitedUser?.user?.image)}
          height={150}
          width={150}
          objectFit="cover"
          alt="Profile image"
        />

           <div 
          
           className="absolute bottom-0 left-28
           max-sm:left-12
           max-sm:-bottom-2  ">
            <IsOnlineColor candidateId={visitedUser.user._id} />
          </div>
      
      </div>

      <div className=" space-y-5   ">
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
            <OtherPersonProfile profileOwner={visitedUser} />
          )}
        </div>
        <div className="  flex space-x-5 ">
          {/* <PostModal user={user} users={user.prefferences.posts}/> */}
          <FollowersModal
            friends={profileFriends?.followers}
            buttonName={"Delete"}
          />
          <FollowingsModal
            friends={profileFriends?.followings}
            buttonName={"Unsubscribe"}
          />
        </div>
      </div>
    </div>
  );
}

function Followers(
  props: withModalType & {
    friends: [string];
    buttonName: "Delete" | "Unsubscribe";
  }
) {
  return (
    <p className=" cursor-pointer" onClick={props.setModal}>
      {" "}
      <strong>{props.friends?.length}</strong> followers
    </p>
  );
}
const FollowersModal = WithModal(Followers, DeleteOrAddToFriends);

function Followings(props: withModalType & { friends: [string] }) {
  return (
    <p className=" cursor-pointer" onClick={props.setModal}>
      {" "}
      <strong>{props.friends?.length}</strong> follwings
    </p>
  );
}
const FollowingsModal = WithModal(Followings, DeleteOrAddToFriends);
