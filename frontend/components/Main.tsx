import { userVar } from "@/reactive/user";
import { gql, useQuery } from "@apollo/client";
import React, { Suspense } from "react";
import { log } from "console";
import Posts from "./post/Posts";
import Loading from "./Loading";
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
export function Main() {
  const userId = "1";
  const { data } = useQuery(query, { variables: { Id: userId } });
  userVar(data?.getUserData);

  return (
    <main className=" flex w-full justify-center z-10">
       <Suspense fallback={  <div className=" flex justify-center items-center h-2/5">
            <Loading />
          </div>}>

        {data?.getUserData&&<Posts />  }  
          </Suspense>
      
    </main>
  );
}
