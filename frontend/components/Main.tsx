import { userVar } from "@/reactive/user";
import { useQuery, useReactiveVar } from "@apollo/client";
import React, { Suspense, useEffect, useState } from "react";
import { log } from "console";
import Posts from "./post/Posts";
import Loading from "./Loading";
import { getUserAndPrefferencesGql } from "@/gql/user";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { LStorage } from "@/helpers/user";
import { Sidebar } from "./Sidebar";
import { useLogginedUserdata } from "@/hooks/user";
import Logo from "./Logo";
import OnlineFriends from "./OnlineFriends";

export function Main() {
  const userId = LStorage.getUser()?._id;
  console.log(userId);

  const { data: loggedUser } = useLogginedUserdata();
  const { data, refetch,loading } = useQuery(getUserAndPrefferencesGql, {
    variables: { Id: userId },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
if(loading){
  return <Logo/>
}
  const userData = data?.getUserData as UserAndPrefferncesType;
  userVar(userData);

  return (
    <div className="flex justify-between  w-full
    max-[500px]:block">
      
      <>
        <Sidebar />
        <div className=" w-full flex justify-center">
          {data?.getUserData && <Posts />}
        </div>
        <OnlineFriends/>
      </>
    </div>
  );
}
