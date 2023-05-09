"use client";

import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { log } from "console";
import { ProfileTop } from "./ProfileTop";
import { ProfileActions } from "./ProfileAction";
import { UserType, UserPrefferencesType, UserAndPrefferncesType } from "../../../types/userType";
import { useEffect, useState } from "react";
import {WithModal } from "../../Hoc/WithModal";
import { userVar } from "@/reactive/user";

const query = gql`
  query ($Id: String) {
    getUserData(id: $Id) {
      user {
        _id
        name
        surname
      }
      prefferences {
        followers
        followings
        posts
      }
    }
  }
`;
type propsType={
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
 function Profile() {

  const router = useRouter();
  const RouterId = router.query.id;

  
const user=useReactiveVar(userVar) 
console.log(user);
const userId=user?.user._id

  const { loading, data,refetch } = useQuery(query, {
    variables: { Id: RouterId},
    skip:!(router.isReady),
  });

useEffect(() => {
    if (userId!==RouterId) {
   refetch();
    }
  }, [RouterId, refetch, router.isReady, userId]);
 
  const foundData = data?.getUserData as UserAndPrefferncesType

  if (loading) {
    return <p className=" text-4xl">Loading</p>;
  }
 
  return (
    <div className=" pl-10">

      <ProfileTop data={foundData} />
      <ProfileActions data={foundData}  />
      
    </div>
   
   
  );
}

export default Profile