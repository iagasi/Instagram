import { userVar } from "@/reactive/user";
import { useQuery, useReactiveVar } from "@apollo/client";
import React, { Suspense, useEffect } from "react";
import { log } from "console";
import Posts from "./post/Posts";
import Loading from "./Loading";
import { getUserAndPrefferencesGql } from "@/gql/user";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { LStorage } from "@/helpers/user";
import { Sidebar } from "./Sidebar";
import { useLogginedUserdata } from "@/hooks/user";

export function Main() {
  const userId = "1";
  LStorage.setUser({_id:"1",name:"cc",surname:"xcvxc",image:""});

  const {data:loggedUser}=useLogginedUserdata()
  const { data,refetch } = useQuery(getUserAndPrefferencesGql, {
    variables: { Id: LStorage.getUser()?._id  },
  });
  useEffect(()=>{refetch()},[refetch])
  console.log(data?.getUserData);
  
  
  const userData = data?.getUserData as UserAndPrefferncesType;
  userVar(userData);
 
  
  return (
    <div className="flex justify-between  w-full">
      <Sidebar />
      <div className=" w-full flex justify-center">
        {data?.getUserData && <Posts />}
      </div>
    </div>
  );
}
