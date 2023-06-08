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

export function Main() {
  const [id,setId]=useState("")
  const userId =  LStorage.getUser()?._id;

  const {data:loggedUser}=useLogginedUserdata()
  const { data,refetch } = useQuery(getUserAndPrefferencesGql, {
    variables: { Id: LStorage.getUser()?._id  },
  });
  useEffect(()=>{refetch()},[refetch])
  
  
  const userData = data?.getUserData as UserAndPrefferncesType;
  userVar(userData);
 
  
  return (
   
    <div className="flex justify-between  w-full">
       {
      !userId ?<div className=" bg-slate-500 p-8"> 
        <input onChange={(e)=>setId(e.target.value)}></input>
        <button onClick={()=>{
          LStorage.setUser({_id:id,name:"cc",surname:"xcvxc",image:""})
          window.location.reload()}}>Set</button>
      </div>:
      <>
      
      
        <Sidebar />
        <div className=" w-full flex justify-center">
          {data?.getUserData && <Posts />}
        </div>
      </>
      

    }
    
    
    </div>
  );
}
