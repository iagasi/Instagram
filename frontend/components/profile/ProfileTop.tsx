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
import { userVar } from "@/reactive/user";


const UserFriends=gql(`
query GetUserFriends($id:String) {
  getUserFriends (id:$id){
    followers {
      _id
      name
      surname
      image
    }
    followings {
      _id
      name
      surname
      image
    }
  }
}`) 
type PropsType={
  visitedUser: UserAndPrefferncesType
}
export function ProfileTop({ visitedUser }: PropsType) {
  const router = useRouter();
const {data:friendsData,refetch}=useQuery<Query>(UserFriends,{
  variables:{id:visitedUser?.user._id},
  skip:!visitedUser
}
); 
const friends=friendsData?.getUserFriends

const loggedUser=useReactiveVar(userVar)

console.log(loggedUser);

  if (!visitedUser?.prefferences?.posts) {
    return <div>Loading</div>;
  }
  const myProfile = router.query.id == "1";

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
            {visitedUser?.user.name} {visitedUser?.user.surname}
          </span>

          {myProfile ? (
            <>
              <EditProfile />
              <OpenSettings />
            </>
          ) : (
            <OtherPersonProfile
              currLoggedUser={visitedUser}
              thisUser={visitedUser}
            />
          )}
        </div>
        <div className="  flex space-x-5">
          {/* <PostModal user={user} users={user.prefferences.posts}/> */}
         <FollowersModal  friends={friends?.followers} buttonName={"Delete"} refetchFriends={()=>refetch()} />
         <FollowingsModal friends={friends?.followings} buttonName={"Unsubscribe"} refetchFriends={()=>refetch()}/>
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
  
