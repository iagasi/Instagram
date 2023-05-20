import { userVar } from "@/reactive/user";
import { useQuery, useReactiveVar } from "@apollo/client";
import React, { Suspense } from "react";
import { log } from "console";
import Posts from "./post/Posts";
import Loading from "./Loading";
import { getUserAndPrefferencesGql } from "@/gql/user";
import { UserAndPrefferncesType, UserType } from "@/../types/userType";
import { LStorage } from "@/helpers/user";

export function Main() {
  const userId = "1";
  const { data } = useQuery(getUserAndPrefferencesGql, {
    variables: { Id: userId },
  });
  const userData = data?.getUserData as UserAndPrefferncesType;
  userVar(userData);
  LStorage.setUser(userData);
  return (
    <main className=" flex w-full justify-center ">
      {data?.getUserData && <Posts />}
    </main>
  );
}
