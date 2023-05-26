"use client";

import { useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { ProfileTop } from "./ProfileTop";
import { ProfileActions } from "./ProfileAction";
import { UserAndPrefferncesType } from "../../../types/userType";
import { userVar, visitedPersonFriendsVar, visitedPersonVar } from "@/reactive/user";
import { Sidebar } from "../Sidebar";
import { getUserAndPrefferencesGql } from "@/gql/user";
import { LStorage } from "@/helpers/user";
import { Query } from "@/__generated__/graphql";
import { useLogginedUserdata, usePageFriendsQuery, useVisitedPageUser } from "@/hooks/user";
import { useEffect } from "react";

function Profile() {
const {data:logginedUser}=useLogginedUserdata()
userVar(logginedUser)
const {loading,data:visitedPageData,refetch:refetchPageData}=useVisitedPageUser()
// visitedPersonVar(data)
//  const visitedPerson= useReactiveVar(visitedPersonVar)
useEffect(()=>{
  refetchPageData()
},[refetchPageData])
 const {data:profileFriends}=usePageFriendsQuery(visitedPageData?.user?._id||"1",false)
//visitedPersonFriendsVar(profileFriends)
 if (loading||!visitedPageData) {
    return <p className=" text-4xl">Loading</p>;
  } 
  
  return (
    <div className="">
      <div className=" flex ">
        <Sidebar />
        <div className=" flex-1">
          <ProfileTop visitedUser={visitedPageData} profileFriends={profileFriends} />
          <ProfileActions data={visitedPageData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
